import { getProfile } from "@/modules/profile/api/getProfile";
import ProfilePage from "@/modules/profile/components/ProfilePage";

export default async function ProfileContent() {
  const profile = await getProfile();

  return <ProfilePage profile={profile} />;
}