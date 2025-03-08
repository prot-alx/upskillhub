import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <aside>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard">Статистика</Link>
            </li>
            <li>
              <Link href="/dashboard/courses">Курсы</Link>
            </li>
            <li>
              <Link href="/dashboard/profile">Профиль</Link>
            </li>
            <li>
              <Link href="/dashboard/settings">Настройки</Link>
            </li>
            <li>
              <Link href="/">На главную</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
