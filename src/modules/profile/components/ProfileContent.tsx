import { getProfile } from "@/modules/profile/api/getProfile";
import ProfilePage from "@/modules/profile/components/ProfilePage";
import { redirect } from "next/navigation";

export default async function ProfileContent() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return <ProfilePage profile={profile} />;
}