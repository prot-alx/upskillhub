export default function DashboardPage() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin ? (
        <>
          <h1>Общая статистика</h1>
          <p>Добро пожаловать в админ-панель</p>
        </>
      ) : (
        <>
          <h1>Моя статистика</h1>
          <p>Статистика всех моих курсов</p>
        </>
      )}
    </div>
  );
}
