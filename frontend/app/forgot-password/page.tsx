"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, Loader, Check } from "lucide-react"
import Link from "next/link"

type ResetStep = 'email' | 'sent'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<ResetStep>('email')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock password reset request
    setTimeout(() => {
      setIsLoading(false)
      setStep('sent')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-6">
          {/* REACH Logo */}
          <div className="flex justify-center mb-4">
            <img src="/reach-logo.webp" alt="REACH Hong Kong" className="h-8 w-auto opacity-90" />
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {step === 'email' ? 'Reset Password' : 'Check Your Email'}
            </h1>
            <p className="text-base text-gray-500 mt-1 font-medium">
              {step === 'email' ? 'Enter your email to receive reset instructions' : 'We\'ve sent you a password reset link'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-6 space-y-6">
            {step === 'email' && (
              <>
                {/* Back button */}
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-2 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                  <div className="text-sm text-gray-500">
                    Back to sign in
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-4 h-4 text-gray-500" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-xl font-semibold py-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>

                <div className="text-center text-sm">
                  <span className="text-gray-500">Remember your password? </span>
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Sign in
                  </Link>
                </div>
              </>
            )}

            {step === 'sent' && (
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600 stroke-2" />
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">Reset Link Sent!</h3>
                  <p className="text-sm text-gray-500">
                    We've sent a password reset link to <span className="font-semibold">{email}</span>
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-blue-900">Next Steps</h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Check your email inbox</li>
                    <li>Click the password reset link</li>
                    <li>Create a new password</li>
                    <li>Sign in with your new password</li>
                  </ol>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.href = 'mailto:'}
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold py-3"
                  >
                    Open Email App
                  </Button>

                  <div className="text-center text-sm">
                    <span className="text-gray-500">Didn't receive the email? </span>
                    <button
                      onClick={() => setStep('email')}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Try again
                    </button>
                  </div>

                  <div className="text-center text-sm">
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Back to sign in
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
