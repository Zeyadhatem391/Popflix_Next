import PublicLayout from "@/shared/components/layout/PublicLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicLayout> {children}</PublicLayout>
    </>
  );
}
