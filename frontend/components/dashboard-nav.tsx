"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, BarChart3, Users, Settings } from "lucide-react"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

const navigation = [
  { name: "dashboardNav.overview", href: "/", icon: BookOpen },
  { name: "dashboardNav.assignments", href: "/assignments", icon: BookOpen },
  { name: "dashboardNav.dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "dashboardNav.community", href: "/community", icon: Users },
  { name: "dashboardNav.settings", href: "/settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <nav className="flex space-x-1">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{t(`components.${item.name}`)}</span>
          </Link>
        )
      })}
    </nav>
  )
}
