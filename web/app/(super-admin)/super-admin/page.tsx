import { getServerUser } from "@/actions/auth";
import UserProfile from "./user-profile/components/user-profile";
import { redirect } from "next/navigation";
// import UserProfile from "./components/user-profile";

export default async function UserProfilePage() {
	redirect("/super-admin/churches");
	const user = await getServerUser();
	// if (!user) return <div>Please log in</div>;
	// return <UserProfile userId={user.id} />;
}
