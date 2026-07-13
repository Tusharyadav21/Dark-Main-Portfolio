import { cookies } from "next/headers";
import nodeCrypto from "node:crypto";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours
const MAX_AUTH_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

// ---------------------------------------------------------------------------
// HMAC-SHA256 signing (Node.js crypto — used in API routes)
// ---------------------------------------------------------------------------

function getSecret(): string {
	const secret = process.env.ADMIN_SECRET;
	if (!secret) throw new Error("ADMIN_SECRET not configured");
	return secret;
}

function sign(data: string): string {
	return nodeCrypto
		.createHmac("sha256", getSecret())
		.update(data)
		.digest("base64url");
}

function verify(data: string, signature: string): boolean {
	const expected = sign(data);
	if (expected.length !== signature.length) return false;
	return nodeCrypto.timingSafeEqual(
		Buffer.from(expected),
		Buffer.from(signature),
	);
}

// ---------------------------------------------------------------------------
// Session payload
// ---------------------------------------------------------------------------

interface SessionPayload {
	iat: number;
	exp: number;
}

function encodePayload(payload: SessionPayload): string {
	return Buffer.from(JSON.stringify(payload)).toString("base64url");
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

// ---------------------------------------------------------------------------
// Cookie creation / verification
// ---------------------------------------------------------------------------

export async function createSessionCookie(): Promise<string> {
	const payload: SessionPayload = {
		iat: Date.now(),
		exp: Date.now() + COOKIE_MAX_AGE * 1000,
	};
	const encoded = encodePayload(payload);
	const signature = sign(encoded);
	return `${encoded}.${signature}`;
}

export async function verifySessionCookie(): Promise<boolean> {
	const cookieStore = await cookies();
	const raw = cookieStore.get(COOKIE_NAME)?.value;
	if (!raw) return false;

	const parts = raw.split(".");
	if (parts.length !== 2) return false;

	const [encoded, signature] = parts;
	const payload = decodePayload(encoded);
	if (!payload) return false;

	// Check expiration
	if (Date.now() > payload.exp) return false;

	// Verify HMAC signature (timing-safe)
	return verify(encoded, signature);
}

// ---------------------------------------------------------------------------
// Rate limiting (In-memory)
// ---------------------------------------------------------------------------

const rateLimitMap = new Map<string, { attempts: number; timestamp: number }>();

export interface RateLimitResult {
	allowed: boolean;
	remaining: number;
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
	const now = Date.now();
	const record = rateLimitMap.get(identifier);

	if (!record) {
		return { allowed: true, remaining: MAX_AUTH_ATTEMPTS };
	}

	if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
		rateLimitMap.delete(identifier);
		return { allowed: true, remaining: MAX_AUTH_ATTEMPTS };
	}

	const remaining = MAX_AUTH_ATTEMPTS - record.attempts;
	return {
		allowed: remaining > 0,
		remaining: Math.max(0, remaining),
	};
}

export async function incrementAttempts(identifier: string): Promise<void> {
	const now = Date.now();
	const record = rateLimitMap.get(identifier);

	if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
		rateLimitMap.set(identifier, { attempts: 1, timestamp: now });
	} else {
		record.attempts += 1;
		rateLimitMap.set(identifier, record);
	}
}

// ---------------------------------------------------------------------------
// Password validation
// ---------------------------------------------------------------------------

export function validatePassword(password: string): boolean {
	const stored = process.env.ADMIN_PASSWORD;
	if (!stored) return false;
	return password === stored;
}

// ---------------------------------------------------------------------------
// Cookie helpers for API routes
// ---------------------------------------------------------------------------

function isSecure(): boolean {
	return process.env.NODE_ENV === "production";
}

export function setAuthCookie(value: string): string {
	return [
		`${COOKIE_NAME}=${value}`,
		"Path=/",
		"HttpOnly",
		isSecure() ? "Secure" : "",
		"SameSite=Strict",
		`Max-Age=${COOKIE_MAX_AGE}`,
	]
		.filter(Boolean)
		.join("; ");
}

export function clearAuthCookie(): string {
	return [
		`${COOKIE_NAME}=`,
		"Path=/",
		"HttpOnly",
		isSecure() ? "Secure" : "",
		"SameSite=Strict",
		"Max-Age=0",
	]
		.filter(Boolean)
		.join("; ");
}
