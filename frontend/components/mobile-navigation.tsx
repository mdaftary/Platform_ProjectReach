"use client"

import { Home, BarChart3, Users, HandHeart, Trophy } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/progress", icon: BarChart3, label: "Progress" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/volunteer", icon: HandHeart, label: "Volunteer" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-all duration-200 min-w-[60px]",
                isActive 
                  ? "text-green-600" 
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-green-600" : "text-gray-500"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
