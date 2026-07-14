"use client";

import {
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContentFile {
	slug: string;
	raw: string;
}

interface ValidationError {
	path: string;
	message: string;
}

interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
	slug: string;
}

// Slug → human-readable name
const SLUG_LABELS: Record<string, string> = {
	metadata: "SEO Metadata",
	profile: "Profile",
	navigation: "Navigation",
	home: "Home Hero",
	about: "About Me (Markdown)",
	contact: "Contact & Social",
	"work-experience": "Work Experience",
	education: "Education",
	skills: "Technical Skills",
	projects: "Projects",
	achievements: "Achievements",
	"system-prompts": "AI System Prompts",
};

const SLUG_ORDER = [
	"profile",
	"home",
	"about",
	"projects",
	"work-experience",
	"education",
	"skills",
	"achievements",
	"contact",
	"navigation",
	"metadata",
	"system-prompts",
];

// ---------------------------------------------------------------------------
// Login Form
// ---------------------------------------------------------------------------

function LoginForm({
	onLogin,
}: {
	onLogin: () => void;
}) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await fetch("/api/admin/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});

			const data = await res.json();

			if (data.success) {
				onLogin();
			} else {
				setError(data.error || "Login failed");
			}
		} catch {
			setError("Network error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm space-y-6"
			>
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">
						Admin Panel
					</h1>
					<p className="text-gray-500 dark:text-gray-400">
						Enter your password to continue
					</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						value={password}
						onChange={(e) =>
							setPassword(e.target.value)
						}
						placeholder="••••••••"
						autoFocus
						required
					/>
				</div>

				{error && (
					<p className="text-sm text-red-500 text-center">
						{error}
					</p>
				)}

				<Button
					type="submit"
					className="w-full"
					disabled={loading}
				>
					{loading ? "Signing in..." : "Sign In"}
				</Button>
			</form>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Validation Status
// ---------------------------------------------------------------------------

function ValidationStatus({
	result,
	initial,
}: {
	result: ValidationResult | null;
	initial: boolean;
}) {
	if (initial) {
		return (
			<p className="text-xs text-gray-400">
				Editing...
			</p>
		);
	}

	if (!result) {
		return (
			<p className="text-xs text-gray-400">
				Validating...
			</p>
		);
	}

	if (result.valid) {
		return (
			<p className="text-xs text-green-600 dark:text-green-400">
				Valid
			</p>
		);
	}

	return (
		<div className="space-y-1">
			<p className="text-xs text-red-500 font-medium">
				{result.errors.length} validation{" "}
				{result.errors.length === 1
					? "error"
					: "errors"}
			</p>
			<ul className="text-xs text-red-400 space-y-0.5 max-h-32 overflow-y-auto">
				{result.errors.map((err, i) => (
					<li key={i}>
						<span className="font-mono text-red-300">
							{err.path || "root"}
						</span>
						: {err.message}
					</li>
				))}
			</ul>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Content Editor
// ---------------------------------------------------------------------------

function ContentEditor({
	file,
	onSave,
	onBack,
}: {
	file: ContentFile;
	onSave: (
		slug: string,
		content: string,
	) => Promise<void>;
	onBack: () => void;
}) {
	const [content, setContent] = useState(file.raw);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState("");
	const [validation, setValidation] =
		useState<ValidationResult | null>(null);
	const [isInitial, setIsInitial] = useState(true);
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(
		null,
	);

	// Debounced validation on content change
	const validate = useCallback(
		(slug: string, raw: string) => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
			debounceRef.current = setTimeout(async () => {
				try {
					const res = await fetch(
						"/api/admin/validate",
						{
							method: "POST",
							headers: {
								"Content-Type":
									"application/json",
							},
							body: JSON.stringify({
								slug,
								content: raw,
							}),
						},
					);
					const result: ValidationResult =
						await res.json();
					setValidation(result);
					setIsInitial(false);
				} catch {
					setValidation(null);
					setIsInitial(false);
				}
			}, 500);
		},
		[],
	);

	// Validate on mount with initial content
	useEffect(() => {
		validate(file.slug, file.raw);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (value: string) => {
		setContent(value);
		setSaved(false);
		setError("");
		validate(file.slug, value);
	};

	const handleSave = async () => {
		if (validation && !validation.valid) return;

		setSaving(true);
		setError("");
		setSaved(false);

		try {
			await onSave(file.slug, content);
			setSaved(true);
			setTimeout(() => setSaved(false), 3000);
		} catch {
			setError("Failed to save");
		} finally {
			setSaving(false);
		}
	};

	const canSave =
		validation?.valid === true && !saving;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Button variant="ghost" onClick={onBack}>
					← Back
				</Button>
				<div className="flex items-center gap-3">
					<ValidationStatus
						result={validation}
						initial={isInitial}
					/>
					{saved && (
						<span className="text-sm text-green-600 dark:text-green-400">
							Saved & committed
						</span>
					)}
					{error && (
						<span className="text-sm text-red-500">
							{error}
						</span>
					)}
					<Button
						onClick={handleSave}
						disabled={!canSave}
					>
						{saving
							? "Committing..."
							: "Save & Commit"}
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				<Label className="text-lg font-semibold">
					{SLUG_LABELS[file.slug] || file.slug}
				</Label>
				<p className="text-xs text-gray-500">
					content/{file.slug}.md
				</p>
			</div>

			<Textarea
				value={content}
				onChange={(e) => handleChange(e.target.value)}
				className="min-h-[60vh] font-mono text-sm leading-relaxed resize-y"
				spellCheck={false}
			/>

			<p className="text-xs text-gray-400 text-right">
				{content.length} characters
			</p>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Main Panel
// ---------------------------------------------------------------------------

export default function AdminPanel() {
	const [files, setFiles] = useState<ContentFile[]>([]);
	const [selected, setSelected] = useState<string | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);

	const fetchContentData = useCallback(async () => {
		try {
			const res = await fetch("/api/admin/content");
			if (res.status === 401) {
				return { auth: false, files: [] };
			}
			const data = await res.json();
			return { auth: true, files: data.files || [] };
		} catch {
			return { auth: false, files: [] };
		}
	}, []);

	const fetchFiles = useCallback(async () => {
		const result = await fetchContentData();
		if (result.auth) {
			setFiles(result.files);
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
		setLoading(false);
	}, [fetchContentData]);

	useEffect(() => {
		let isMounted = true;
		fetchContentData().then(result => {
			if (!isMounted) return;
			if (result.auth) {
				setFiles(result.files);
				setAuthenticated(true);
			} else {
				setAuthenticated(false);
			}
			setLoading(false);
		});
		return () => { isMounted = false; };
	}, [fetchContentData]);

	const handleSave = async (
		slug: string,
		content: string,
	) => {
		const res = await fetch("/api/admin/save", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ slug, content }),
		});

		if (!res.ok) {
			const data = await res.json();
			throw new Error(data.error || "Save failed");
		}

		// Refresh file list to get updated content
		await fetchFiles();
	};

	const handleLogout = async () => {
		document.cookie =
			"admin_session=; Path=/; Max-Age=0";
		setAuthenticated(false);
		setSelected(null);
	};

	// Loading
	if (loading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<p className="text-gray-500">Loading...</p>
			</div>
		);
	}

	// Not authenticated
	if (!authenticated) {
		return (
			<LoginForm
				onLogin={() => {
					setAuthenticated(true);
					fetchFiles();
				}}
			/>
		);
	}

	// Content editor view
	if (selected) {
		const file = files.find((f) => f.slug === selected);
		if (!file) {
			setSelected(null);
			return null;
		}
		return (
			<ContentEditor
				file={file}
				onSave={handleSave}
				onBack={() => setSelected(null)}
			/>
		);
	}

	// File list view
	const sortedFiles = [...files].sort((a, b) => {
		const ai = SLUG_ORDER.indexOf(a.slug);
		const bi = SLUG_ORDER.indexOf(b.slug);
		return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">
						Content Manager
					</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-1">
						Edit content files. Changes are
						committed to GitHub and deployed
						automatically.
					</p>
				</div>
				<Button
					variant="outline"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</div>

			<Separator />

			<div className="grid gap-3">
				{sortedFiles.map((file) => (
					<button
						key={file.slug}
						onClick={() =>
							setSelected(file.slug)
						}
						className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-left"
					>
						<div>
							<span className="font-medium">
								{SLUG_LABELS[
									file.slug
								] || file.slug}
							</span>
							<span className="ml-2 text-xs text-gray-400">
								content/{file.slug}.md
							</span>
						</div>
						<span className="text-sm text-gray-400">
							{file.raw.length} chars
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
