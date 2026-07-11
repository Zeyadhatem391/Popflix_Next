import { Skeleton } from "@/components/ui/skeleton";

function UserSkeleton() {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-xl px-8 py-2 bg-white/10">
      <Skeleton className="w-8 h-8 rounded-xl" />
    </div>
  );
}

export default UserSkeleton;
