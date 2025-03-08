import Link from "next/link";

export default function DashboardCoursesPage() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin ? (
        <>
          <h1>Управление курсами</h1>
          <p>Панель управления курсами для администратора</p>
          <nav>
            <Link href="/">На главную</Link>
          </nav>
        </>
      ) : (
        <>
          <h1>Мои курсы</h1>
          <p>Курсы, на которые вы записаны</p>
          <nav>
            <Link href="/">На главную</Link>
          </nav>
        </>
      )}
    </div>
  )
}