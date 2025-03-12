"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserSettings } from "@/store/userSettingsStore";

interface SettingsProviderProps {
  children: ReactNode;
}

export default function SettingsProvider({
  children,
}: Readonly<SettingsProviderProps>) {
  const { data: session, status } = useSession();
  const { initializeFromSession } = useUserSettings();
  const [mounted, setMounted] = useState(false);

  // Отмечаем, что компонент смонтирован (для предотвращения ошибок гидратации)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Инициализируем настройки из сессии при загрузке (только на клиенте после гидратации)
  useEffect(() => {
    if (mounted && status !== "loading") {
      initializeFromSession(session);
    }
  }, [mounted, session, status, initializeFromSession]);

  return <>{children}</>;
}
