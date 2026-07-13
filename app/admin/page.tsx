import AdminPanel from "@/components/admin-panel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
	return (
		<div className="max-w-5xl mx-auto w-full">
			<AdminPanel />
		</div>
	);
}
