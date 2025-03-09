import ClientAppLayout from "@/components/layout/ClientAppLayout";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientAppLayout>{children}</ClientAppLayout>;
}
