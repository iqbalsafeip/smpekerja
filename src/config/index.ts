import {
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
  { label: "Log Pekerjaan", icon: IconActivity, link: "/dashboard" },
  { label: "Tamu Yang Datang", icon: IconMoodSmile, link: "/dashboard" },
  { label: "Potensi", icon: IconAdjustmentsSearch, link: "/dashboard" },
  
  {
    label: "Akun",
    icon: IconLock,
    initiallyOpened: true,
    links: [
      {
        label: "Profile",
        link: "/dashboard/table",
      },
      {
        label: "Privasi",
        link: "/dashboard/form",
      },
    ],
  },
  
  { label: "Logout", icon: IconLogout, link: "/dashboard", onClick: (cb :any) => logout(cb) },
];
