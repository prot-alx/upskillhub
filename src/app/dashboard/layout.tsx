import ClientAppLayout from "@/components/layout/ClientAppLayout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientAppLayout>{children}</ClientAppLayout>;
}
