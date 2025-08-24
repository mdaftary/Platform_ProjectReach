"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"
import i18n from "@/lib/i18n"
import { useEffect, useMemo } from "react"

export default function LanguageSwitcher() {
  const { i18n: i18nextInstance } = useTranslation()

  const current = useMemo(() => {
    const lang = i18nextInstance.language || i18n.language || "en"
    if (lang.startsWith("zh")) return "zh"
    if (lang.startsWith("en")) return "en"
    return "en"
  }, [i18nextInstance.language])

  useEffect(() => {
    document.documentElement.lang = current
  }, [current])

  const onChange = async (value: string) => {
    await i18n.changeLanguage(value)
    try {
      if (window && window.localStorage) {
        window.localStorage.setItem("i18nextLng", value)
      }
    } catch {}
  }

  return (
    <Select value={current} onValueChange={onChange}>
      <SelectTrigger className="h-8 w-[110px] rounded-md bg-white/90">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="w-[140px]">
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="zh">中文</SelectItem>
      </SelectContent>
    </Select>
  )
}


