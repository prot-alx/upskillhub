import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <h1>Профиль пользователя</h1>
      <div>
        <p>Имя: Иван Иванов</p>
        <p>Email: user@example.com</p>
      </div>
      <nav>
        <Link href="/">На главную</Link>
      </nav>
    </div>
  );
}
