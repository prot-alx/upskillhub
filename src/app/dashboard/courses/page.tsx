export default function DashboardCoursesPage() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin ? (
        <>
          <h1>Управление курсами</h1>
          <p>Панель управления курсами для администратора</p>
        </>
      ) : (
        <>
          <h1>Мои курсы</h1>
          <p>Курсы, на которые вы записаны</p>
        </>
      )}
    </div>
  )
}