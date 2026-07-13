import { NextRequest, NextResponse } from "next/server";

// Config

const COOKIE_NAME = "admin_session";
const PROTECTED_PATHS = ["/admin", "/api/admin"];

// HMAC-SHA256 verification (Edge-compatible — Web Crypto API only)
async function getKey(secret: string): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);
}

async function verifyHmac(
	data: string,
	signature: string,
	secret: string,
): Promise<boolean> {
	try {
		const key = await getKey(secret);
		const sigBytes = Buffer.from(signature, "base64url");
		const validSig = await crypto.subtle.sign(
			"HMAC",
			key,
			new TextEncoder().encode(data),
		);
		const validBytes = Buffer.from(validSig);
		if (sigBytes.length !== validBytes.length) return false;
		// Timing-safe comparison for Edge runtime
		let diff = 0;
		for (let i = 0; i < sigBytes.length; i++) {
			diff |= sigBytes[i]! ^ validBytes[i]!;
		}
		return diff === 0;
	} catch {
		return false;
	}
}

interface SessionPayload {
	iat: number;
	exp: number;
	attempts: number;
}

function decodePayload(encoded: string): SessionPayload | null {
	try {
		return JSON.parse(
			Buffer.from(encoded, "base64url").toString("utf8"),
		) as SessionPayload;
	} catch {
		return null;
	}
}

async function verifySession(
	raw: string,
	secret: string,
): Promise<boolean> {
	const parts = raw.split(".");
	if (parts.length !== 2) return false;

	const [encoded, signature] = parts;
	const payload = decodePayload(encoded);
	if (!payload) return false;

	// Check expiration
	if (Date.now() > payload.exp) return false;

	// Verify HMAC (timing-safe)
	return verifyHmac(encoded, signature, secret);
}

// Proxy (runs at edge, in front of all matching routes)

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Only intercept protected paths
	const isProtected = PROTECTED_PATHS.some(
		(p) => pathname === p || pathname.startsWith(`${p}/`),
	);
	if (!isProtected) return NextResponse.next();

	// Allow POST to /api/admin/auth (login) and /api/admin/validate (read-only) without session
	if (
		pathname === "/api/admin/auth" &&
		request.method === "POST"
	) {
		return NextResponse.next();
	}
	if (
		pathname === "/api/admin/validate" &&
		request.method === "POST"
	) {
		return NextResponse.next();
	}

	const secret = process.env.ADMIN_SECRET;
	if (!secret) {
		return NextResponse.json(
			{ error: "Server misconfigured" },
			{ status: 500 },
		);
	}

	const cookie = request.cookies.get(COOKIE_NAME)?.value;
	if (!cookie) {
		// API routes: 401. The /admin page itself shows the login form.
		if (pathname.startsWith("/api/")) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}
		return NextResponse.next();
	}

	const valid = await verifySession(cookie, secret);
	if (!valid) {
		if (pathname.startsWith("/api/")) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}
		// Clear invalid cookie and redirect
		const response = NextResponse.redirect(
			new URL("/admin", request.url),
		);
		response.cookies.set(COOKIE_NAME, "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 0,
			path: "/",
		});
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*", "/api/admin/:path*"],
};
