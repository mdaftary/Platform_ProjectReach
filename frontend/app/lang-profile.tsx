"use client";
import LanguageSwitcher from "@/components/language-switcher";
import { useAuth } from "@/contexts/auth-context";
import { BarChart3, Settings, User } from "lucide-react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

export default function LangProfile() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);
  return (
    <div className="w-full flex justify-between items-center p-2">
      <LanguageSwitcher />
      <div className="absolute top-3 right-3" ref={userMenuRef}>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
        {showUserMenu && (
          <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || user?.phone}
              </p>
            </div>
            <Link
              href="/settings"
              onClick={() => setShowUserMenu(false)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              {t("common.settings")}
            </Link>
            <button
              onClick={() => {
                logout();
                setShowUserMenu(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t("common.signOut")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
