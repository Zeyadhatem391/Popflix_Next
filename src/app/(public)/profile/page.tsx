import { Suspense } from "react";
import ProfileSkeleton from "@/shared/components/skeletons/ProfileSkeleton";
import ProfileContent from "@/modules/profile/components/ProfileContent";

export default function Page() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}