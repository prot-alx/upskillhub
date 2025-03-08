export default function SettingsPage() {
  return (
    <div>
      <h1>Настройки</h1>
      <form>
        <div>
          <label>Уведомления</label>
          <input type="checkbox" />
        </div>
        <div>
          <label>Тема</label>
          <select>
            <option>Светлая</option>
            <option>Темная</option>
          </select>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
