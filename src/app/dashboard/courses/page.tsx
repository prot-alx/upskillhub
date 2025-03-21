"use client";

import {
  AdminDashboard,
  InstructorDashboard,
  UserDashboard,
} from "@/components/ui/DashboardCourses";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@prisma/client";

export default function DashboardCoursesPage() {
  const { session } = useAuth();
  const role = session?.user?.role;

  const renderDashboardByRole = () => {
    switch (role) {
      case Role.ADMIN:
        return <AdminDashboard />;
      case Role.INSTRUCTOR:
        return <InstructorDashboard />;
      case Role.USER:
      default:
        return <UserDashboard />;
    }
  };

  return <div>{renderDashboardByRole()}</div>;
}
