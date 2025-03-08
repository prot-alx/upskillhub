import Link from "next/link";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <h2>Курсы</h2>
        <nav>
          <Link href="/">На главную</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
