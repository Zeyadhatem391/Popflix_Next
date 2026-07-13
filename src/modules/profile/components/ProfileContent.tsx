import ProfilePage from "@/modules/profile/components/ProfilePage";
import checkProfile from "../api/checkProfile";

export default async function ProfileContent() {
  const profile = await checkProfile();

  return <ProfilePage profile={profile} />;
}