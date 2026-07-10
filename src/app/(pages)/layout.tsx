import NextAuthProvider from "@/providers/NextAuthProvider";
import ReactQueryProvider from "@/providers/React-query-provider";
import PublicLayout from "@/shared/components/layout/PublicLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicLayout><NextAuthProvider>
          <ReactQueryProvider>
            {children}
            </ReactQueryProvider>
        </NextAuthProvider></PublicLayout>
    </>
  );
}
