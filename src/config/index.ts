import {
  Icon24Hours,
  IconActivity,
  IconAdjustmentsSearch,
  IconComponents,
  IconDashboard,
  IconLock,
  IconLogout,
  IconMan,
  IconMoodSmile,
} from "@tabler/icons-react";
import type { NavItem } from "@/types/nav-item";
import { logout } from "@/services/user";

export const navLinks: NavItem[] = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
  { label: "Data Absensi", icon: Icon24Hours, link: "/dashboard/absensi" },
  { label: "Log Pekerjaan", icon: IconActivity, link: "/dashboard/log-pekerjaan" },
  { label: "Tamu Yang Datang", icon: IconMoodSmile, link: "/dashboard/tamu-datang" },
  { label: "Potensi", icon: IconAdjustmentsSearch, link: "/dashboard/potensi" },
  // { label: "Akun", icon: IconLock, link: "/dashboard/akun" },
  { label: "Logout", icon: IconLogout, link: "/dashboard", onClick: (cb :any) => logout(cb) },
];
export const navLinksPimpinan: NavItem[] = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
  { label: "Data Absensi", icon: IconActivity, link: "/dashboard/absensi" },
  { label: "Data Log Pekerjaan", icon: IconMoodSmile, link: "/dashboard/log" },
  { label: "Data Tamu", icon: IconLock, link: "/dashboard/tamu-datang" },
  { label: "Data Potensi", icon: IconAdjustmentsSearch, link: "/dashboard/potensi" },
  // { label: "Akun", icon: IconLock, link: "/dashboard/akun" },
  { label: "Logout", icon: IconLogout, link: "/dashboard", onClick: (cb :any) => logout(cb) },
];
