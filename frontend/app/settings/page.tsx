"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Settings, User, Bell, Shield, HelpCircle, LogOut, Accessibility } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useFontSize } from "@/app/font-size-provider"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

export default function SettingsPage() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const { isLarge, toggle } = useFontSize()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-orange-600" />
            {t('settings.title')}
          </h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              {t('settings.accessibility')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('settings.largeText')}</p>
                <p className="text-sm text-gray-500">{t('settings.largeTextDesc')}</p>
              </div>
              <Switch checked={isLarge} onCheckedChange={toggle} aria-label="Toggle large text" />
            </div>
          </CardContent>
        </Card>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t('settings.profile')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-orange-600">EC</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-500">K3 Student</p>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              {t('settings.editProfile')}
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {t('settings.notifications')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('settings.assignmentReminders')}</p>
                <p className="text-sm text-gray-500">{t('settings.assignmentRemindersDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('settings.communityUpdates')}</p>
                <p className="text-sm text-gray-500">{t('settings.communityUpdatesDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('settings.achievementBadges')}</p>
                <p className="text-sm text-gray-500">{t('settings.achievementBadgesDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t('settings.privacy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t('settings.anonymousMode')}</p>
                <p className="text-sm text-gray-500">{t('settings.anonymousModeDesc')}</p>
              </div>
              <Switch />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              {t('settings.changePassword')}
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              {t('settings.support')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              {t('settings.helpCenter')}
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              {t('settings.contactSupport')}
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              {t('settings.reportProblem')}
            </Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardContent className="p-4">
            <Button variant="destructive" className="w-full" onClick={() => {
              logout()
            }}>
              <LogOut className="w-4 h-4 mr-2" />
              {t('common.signOut')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
