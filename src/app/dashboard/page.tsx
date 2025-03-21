"use client";

import {
  AdminStatistics,
  InstructorStatistics,
  UserStatistics,
} from "@/components/ui/DashboardStatistics";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@prisma/client";

export default function DashboardPage() {
  const { session } = useAuth();

  const role = session?.user?.role;

  const renderDashboardByRole = () => {
    switch (role) {
      case Role.ADMIN:
        return <AdminStatistics />;
      case Role.INSTRUCTOR:
        return <InstructorStatistics />;
      case Role.USER:
      default:
        return <UserStatistics />;
    }
  };

  return <div>{renderDashboardByRole()}</div>;
}
