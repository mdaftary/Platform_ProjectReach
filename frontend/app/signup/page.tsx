"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone, User, Eye, EyeOff, Loader, ArrowLeft, Check, AlertCircle, Users, Heart, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import { useFontSize } from "@/app/font-size-provider"
import { cn } from "@/lib/utils"

type SignUpStep = 'input' | 'verification' | 'password' | 'role' | 'parent-details' | 'volunteer-details' | 'complete'
type InputType = 'phone' | 'email' | 'username'
type UserRole = 'parent' | 'volunteer'

export default function SignUpPage() {
  const { t } = useTranslation()
  const { isLarge } = useFontSize()
  const [step, setStep] = useState<SignUpStep>('input')
  const [inputValue, setInputValue] = useState('')
  const [inputType, setInputType] = useState<InputType>('email')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole>('parent')
  const [parentName, setParentName] = useState('')
  const [studentName, setStudentName] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [schoolCode, setSchoolCode] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isRedirectFromLogin, setIsRedirectFromLogin] = useState(false)
  const { signup, login, loginWithGoogle, isLoading } = useAuth()

  // Check for URL parameters (from login redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const redirect = urlParams.get('redirect')
    const email = urlParams.get('email')
    const phone = urlParams.get('phone')
    
    if (redirect === 'true' && (email || phone)) {
      setIsRedirectFromLogin(true)
      if (email) {
        setInputValue(email)
        setInputType('email')
        setStep('verification') // Skip input step, go directly to verification
      } else if (phone) {
        setInputValue(phone)
        setInputType('phone')
        setStep('verification') // Skip input step, go directly to verification
      }
    }
  }, [])

  // Helper functions to detect input type
  const detectInputType = (value: string): InputType => {
    // Check if it's 8 digits (phone number)
    if (/^\d{8}$/.test(value)) {
      return 'phone'
    }
    // Check if it's email format
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'email'
    }
    // Otherwise treat as username
    return 'username'
  }

  const mockCheckUserExists = async (value: string, type: InputType): Promise<boolean> => {
    console.log(`🔍 [SIGNUP] Checking if user exists: ${value} (${type})`)
    // Mock function - in real app this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
    
    // Get fresh user data from localStorage
    try {
      const storedUsers = localStorage.getItem('mock_users')
      let users = []
      
      if (storedUsers) {
        users = JSON.parse(storedUsers)
        console.log(`📋 [SIGNUP] Found ${users.length} stored users`)
      } else {
        // Fallback to default test users
        users = [
          { username: 'testuser', email: 'test@example.com', phone: undefined },
          { username: 'phone_user', email: undefined, phone: '12345678' }
        ]
        console.log('📋 [SIGNUP] No stored users, using fallback test users')
      }
      
      // Check if user exists based on type
      const exists = users.some((user: any) => {
        if (type === 'username') return user.username === value
        if (type === 'email') return user.email === value
        if (type === 'phone') return user.phone === value
        return false
      })
      
      console.log(`${exists ? '✅' : '❌'} [SIGNUP] User ${exists ? 'EXISTS' : 'NOT FOUND'}: ${value}`)
      return exists
    } catch (error) {
      console.error('❌ [SIGNUP] Error checking user existence:', error)
      // Fallback to original logic
      const fallbackExists = (type === 'username' && value === 'testuser') || 
             (type === 'email' && value === 'test@example.com') ||
             (type === 'phone' && value === '12345678')
      console.log(`🔄 [SIGNUP] Using fallback logic: ${fallbackExists}`)
      return fallbackExists
    }
  }

  const mockValidateSchoolCode = async (code: string): Promise<boolean> => {
    // Mock function - in real app this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return code === 'SCHOOL123' // Test school code
  }

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📝 [SIGNUP] Processing input submission...')
    setError('')
    
    if (!inputValue.trim()) {
      console.log('❌ [SIGNUP] Empty input provided')
      setError(t('signup.errors.enterIdentifier'))
      return
    }

    const detectedType = detectInputType(inputValue)
    console.log(`🔍 [SIGNUP] Detected input type: ${detectedType} for value: ${inputValue}`)
    setInputType(detectedType)

    try {
      if (detectedType === 'phone' || detectedType === 'email') {
        // For phone/email, send verification code
        console.log('📱 [SIGNUP] Phone/email detected, proceeding to verification')
        setStep('verification')
      } else {
        // For username, check if user exists
        console.log('👤 [SIGNUP] Username detected, checking existence...')
        const exists = await mockCheckUserExists(inputValue, detectedType)
        setUserExists(exists)
        
        if (exists) {
          // User exists, go to password step
          console.log('🔐 [SIGNUP] User exists, proceeding to password step')
          setStep('password')
        } else {
          // User doesn't exist, ask if they want to sign up
          console.log('➡️ [SIGNUP] User does not exist, proceeding to role selection')
          setStep('role')
        }
      }
    } catch (error) {
      console.error('❌ [SIGNUP] Failed to process input:', error)
      setError(t('signup.errors.failedToProcess'))
    }
  }

        const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔐 [VERIFICATION] Processing verification code...')
    console.log(`📱 [VERIFICATION] Code entered: ${verificationCode}`)
    setError('')
    
    if (verificationCode !== '0000') {
      console.log('❌ [VERIFICATION] Invalid verification code')
      setError(t('signup.errors.invalidCode'))
      return
    }
    
    console.log('✅ [VERIFICATION] Valid verification code')

    try {
      // Check if user exists
      console.log('🔍 [VERIFICATION] Checking if user exists after verification...')
      const exists = await mockCheckUserExists(inputValue, inputType)
      setUserExists(exists)
      
      if (exists) {
        console.log(`👤 [VERIFICATION] User exists. Redirect from login: ${isRedirectFromLogin}`)
        if (isRedirectFromLogin) {
          // User exists and came from login, log them in directly
          console.log('🔐 [VERIFICATION] Logging in user directly with verified credentials...')
          try {
            await login({
              identifier: inputValue,
              password: 'verified_user', // Use special password for verified phone/email
              method: inputType === 'phone' ? 'phone' : inputType === 'email' ? 'email' : 'username'
            })
            // Auth provider will handle redirect
            console.log('✅ [VERIFICATION] Login successful')
          } catch (loginError) {
            console.error('❌ [VERIFICATION] Login failed:', loginError)
            setError(t('signup.errors.loginFailed'))
          }
        } else {
          // User exists, redirect to login
          console.log('➡️ [VERIFICATION] Redirecting to login page...')
          window.location.href = `/login?${inputType}=${encodeURIComponent(inputValue)}`
        }
      } else {
        // User doesn't exist, go to role selection
        console.log('➡️ [VERIFICATION] User does not exist, proceeding to role selection')
    setStep('role')
      }
    } catch (error) {
      console.error('❌ [VERIFICATION] Verification process failed:', error)
      setError(t('signup.errors.failedToVerify'))
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!password) {
      setError(t('signup.errors.enterPassword'))
      return
    }

    try {
      await login({
        identifier: inputValue,
        password,
        method: inputType
      })
      // Auth provider will handle redirect
    } catch (error) {
      setError(error instanceof Error ? error.message : t('signup.errors.loginFailed'))
    }
  }

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (role === 'parent') {
      setStep('parent-details')
    } else {
      setStep('volunteer-details')
    }
  }

  const handleParentDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (schoolCode) {
      // Validate school code
      try {
        const isValidCode = await mockValidateSchoolCode(schoolCode)
        if (!isValidCode) {
          setError(t('signup.errors.invalidSchoolCode'))
          return
        }
        // If code is valid, complete signup
        await completeSignup()
      } catch (error) {
        setError(t('signup.errors.failedToValidateSchool'))
      }
    } else {
      // No school code, require additional fields
      if (!parentName || !studentName || !schoolName) {
        setError(t('signup.errors.fillAllFields'))
        return
      }
      await completeSignup()
    }
  }

  const handleVolunteerDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (inputType === 'username') {
      // For username, require password
      if (!password || !confirmPassword) {
        setError(t('signup.errors.enterConfirmPassword'))
      return
    }
    if (password !== confirmPassword) {
        setError(t('signup.errors.passwordMismatch'))
      return
    }
    if (password.length < 6) {
        setError(t('signup.errors.passwordTooShort'))
      return
      }
    }
    
    await completeSignup()
  }

  const completeSignup = async () => {
    try {
      // Convert inputType to the expected method format
      const method = inputType === 'username' ? 'email' : inputType // Fallback to email for username type
      
      await signup({
        method: method as 'phone' | 'email' | 'manual',
        email: inputType === 'email' ? inputValue : (inputType === 'username' ? inputValue : undefined),
        phone: inputType === 'phone' ? inputValue : undefined,
        username: inputType === 'username' ? inputValue : inputValue, // Use inputValue as fallback username
        password: inputType === 'username' ? password : 'generated_password', // Generate password for phone/email
        role,
        parentName: role === 'parent' ? parentName : undefined,
        studentName: role === 'parent' ? studentName : undefined,
        school: role === 'parent' ? (schoolName) : undefined, // Use school code or school name
        schoolCode: role === 'parent' ? schoolCode : undefined
      })
      
      if (role === 'volunteer' && inputType !== 'username') {
        // For volunteer with phone/email, redirect to login
        window.location.href = `/login?${inputType}=${encodeURIComponent(inputValue)}`
      } else {
      setStep('complete')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : t('signup.errors.signupFailed'))
    }
  }

  const handleGoogleSignUp = async () => {
    setError('')
    
    try {
      await loginWithGoogle()
    } catch (error) {
      setError(error instanceof Error ? error.message : t('signup.errors.googleFailed'))
    }
  }

  const resendVerificationCode = () => {
    // Mock resend - in real app this would trigger another SMS/email
    setError('')
    // Show success message or handle resend logic
  }

  const getStepTitle = () => {
    switch (step) {
      case 'input':
        return t('signup.titles.signup')
      case 'verification':
        return isRedirectFromLogin ? t('signup.titles.signin') : t('signup.titles.verifyAccount')
      case 'password':
        return t('signup.titles.enterPassword')
      case 'role':
        return t('signup.titles.chooseRole')
      case 'parent-details':
        return t('signup.titles.parentDetails')
      case 'volunteer-details':
        return t('signup.titles.volunteerDetails')
      case 'complete':
        return t('signup.titles.complete')
      default:
        return t('signup.titles.signup')
    }
  }

  const getStepSubtitle = () => {
    switch (step) {
      case 'input':
        return t('signup.subtitles.enterIdentifier')
      case 'verification':
        return isRedirectFromLogin 
          ? `${t('signup.subtitles.verifyFromLogin')} ${inputType}` 
          : inputType === 'email' ? t('signup.subtitles.verifyEmail') : t('signup.subtitles.verifyPhone')
      case 'password':
        return t('signup.subtitles.passwordPrompt')
      case 'role':
        return t('signup.subtitles.roleSelection')
      case 'parent-details':
        return t('signup.subtitles.parentInfo')
      case 'volunteer-details':
        return inputType === 'username' ? t('signup.subtitles.volunteerSetupPassword') : t('signup.subtitles.volunteerSetupComplete')
      case 'complete':
        return t('signup.subtitles.accountCreated')
      default:
        return ''
    }
  }

  const getInputIcon = () => {
    if (step === 'input') {
      const detectedType = detectInputType(inputValue)
      switch (detectedType) {
      case 'email':
        return <Mail className="w-4 h-4 text-gray-500" />
      case 'phone':
        return <Phone className="w-4 h-4 text-gray-500" />
        case 'username':
          return <User className="w-4 h-4 text-gray-500" />
      }
    }
    return null
  }

  return (
    <div className={cn("min-h-screen bg-gray-50", isLarge && "min-text-lg")}>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-6">
          {/* REACH Logo */}
          <div className="flex justify-center mb-4">
            <img src="/reach-logo.webp" alt="REACH Hong Kong" className="h-8 w-auto opacity-90" />
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {getStepTitle()}
            </h1>
            <p className="text-base text-gray-500 mt-1 font-medium">
              {getStepSubtitle()}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* Step 1: Input */}
            {step === 'input' && (
              <>
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleInputSubmit} className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="input-field" className="text-sm font-medium text-gray-900">
                      {t('signup.labels.identifierField')}
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {getInputIcon() || <User className="w-4 h-4 text-gray-500" />}
                        </div>
                        <Input
                        id="input-field"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={t('signup.placeholders.enterIdentifier')}
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    <div className="text-xs text-gray-500">
                      {t('signup.helper.identifierHelp')}
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
                        {t('signup.loading.processing')}
                        </>
                      ) : (
                      t('signup.buttons.next')
                      )}
                    </Button>
                  </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">{t('signup.messages.or')}</span>
                  </div>
                </div>

                {/* Google SSO */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold py-3"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      {t('signup.loading.connecting')}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {t('login.continueWithGoogle')}
                    </>
                  )}
                </Button>

                {/* Sign In Link */}
                <div className="text-center text-sm">
                  <span className="text-gray-500">{t('signup.links.alreadyHaveAccount')} </span>
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
                    {t('signup.links.signInLink')}
                  </Link>
                </div>
              </>
            )}

            {/* Step 2: Verification Code */}
            {step === 'verification' && (
              <>
                {/* Back button */}
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (isRedirectFromLogin) {
                        window.location.href = '/login'
                      } else {
                        setStep('input')
                      }
                    }}
                    className="p-2 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-gray-500">
                    {inputValue}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleVerificationSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-code" className="text-sm font-medium text-gray-900">
                      {t('signup.labels.verificationCode')}
                    </Label>
                    <Input
                      id="verification-code"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder={t('signup.placeholders.enterCode')}
                      className="rounded-xl text-center text-lg tracking-widest"
                      maxLength={4}
                      required
                    />
                    <div className="text-xs text-gray-500 text-center">
                      {t('signup.helper.testingCode')}
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
                        {t('signup.loading.verifying')}
                      </>
                    ) : (
                      t('signup.buttons.verify')
                    )}
                  </Button>
                </form>

                {/* Resend */}
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={resendVerificationCode}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t('signup.buttons.resendCode')}
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Password (for existing username) */}
            {step === 'password' && (
              <>
                {/* Back button */}
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('input')}
                    className="p-2 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-gray-500">
                    {inputValue}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                      {t('signup.labels.password')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('signup.placeholders.enterPassword')}
                        className="pr-10 rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                      {t('signup.links.forgotPassword')}
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-xl font-semibold py-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        {t('signup.loading.signingIn')}
                      </>
                    ) : (
                      t('signup.buttons.signIn')
                    )}
                  </Button>
                </form>

                <div className="text-center text-sm">
                  <span className="text-gray-500">{t('signup.links.createNewAccount')} </span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep('role')}
                    className="text-green-600 hover:text-green-700 font-semibold p-0 h-auto"
                  >
                    {t('signup.links.signUpLink')}
                  </Button>
                </div>
              </>
            )}

            {/* Step 4: Role Selection */}
            {step === 'role' && (
              <>
                {/* Back button */}
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (inputType === 'username') {
                        setStep('input')
                      } else {
                        setStep('verification')
                      }
                    }}
                    className="p-2 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-gray-500">
                    {inputValue}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleRoleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">{t('signup.labels.roleQuestion')}</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button
                        type="button"
                        variant={role === 'parent' ? 'default' : 'outline'}
                        onClick={() => setRole('parent')}
                        className="duolingo-gradient-primary flex items-start gap-4 text-left font-medium rounded-xl py-4 px-4 h-auto"
                      >
                        <Users className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                          <div className="font-semibold">{t('signup.roles.parent')}</div>
                          <div className="text-sm opacity-80">{t('signup.roles.parentDescription')}</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={role === 'volunteer' ? 'default' : 'outline'}
                        onClick={() => setRole('volunteer')}
                        className="duolingo-gradient-primary flex items-start gap-4 text-left font-medium rounded-xl py-4 px-4 h-auto"
                      >
                        <Heart className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                          <div className="font-semibold">{t('signup.roles.volunteer')}</div>
                          <div className="text-sm opacity-80">{t('signup.roles.volunteerDescription')}</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-xl font-semibold py-3"
                  >
                    {t('signup.buttons.continue')}
                  </Button>
                </form>
              </>
            )}

            {/* Step 5: Parent Details */}
            {step === 'parent-details' && (
              <>
                {/* Back button */}
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('role')}
                    className="p-2 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-gray-500">
                    {t('signup.titles.parentDetails')}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleParentDetailsSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="school-code" className="text-sm font-medium text-gray-900">
                      {t('signup.labels.schoolCodeOptional')}
                    </Label>
                    <Input
                      id="school-code"
                      type="text"
                      value={schoolCode}
                      onChange={(e) => setSchoolCode(e.target.value)}
                      placeholder={t('signup.placeholders.schoolCode')}
                      className="rounded-xl"
                    />
                    <div className="text-xs text-gray-500">
                      {t('signup.helper.schoolCodeHelp')}
                    </div>
                  </div>

                  {!schoolCode && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="parent-name" className="text-sm font-medium text-gray-900">
                          {t('signup.labels.parentName')} {t('signup.fieldLabels.required')}
                        </Label>
                        <Input
                          id="parent-name"
                          type="text"
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          placeholder={t('signup.placeholders.parentName')}
                          className="rounded-xl"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-name" className="text-sm font-medium text-gray-900">
                          {t('signup.labels.studentName')} {t('signup.fieldLabels.required')}
                        </Label>
                        <Input
                          id="student-name"
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder={t('signup.placeholders.studentName')}
                          className="rounded-xl"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="school-name" className="text-sm font-medium text-gray-900">
                          {t('signup.labels.schoolName')} {t('signup.fieldLabels.required')}
                        </Label>
                      <Input
                          id="school-name"
                        type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder={t('signup.placeholders.schoolName')}
                          className="rounded-xl"
                        required
                      />
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-xl font-semibold py-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        {t('signup.loading.creatingAccount')}
                      </>
                    ) : (
                      t('signup.buttons.completeRegistration')
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* Step 6: Volunteer Details */}
            {step === 'volunteer-details' && (
              <>
                {/* Back button */}
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('role')}
                    className="p-2 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-gray-500">
                    {t('signup.titles.volunteerDetails')}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleVolunteerDetailsSubmit} className="space-y-4">
                  {inputType === 'username' && (
                    <>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                          {t('signup.labels.password')} {t('signup.fieldLabels.required')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('signup.placeholders.createPassword')}
                        className="pr-10 rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-900">
                          {t('signup.labels.confirmPassword')} {t('signup.fieldLabels.required')}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t('signup.placeholders.confirmPassword')}
                        className="pr-10 rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                      </div>
                    </>
                  )}

                  {inputType !== 'username' && (
                    <div className="text-center py-4">
                      <p className="text-gray-600">
                        {t('signup.messages.userExists')} {inputType}.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-xl font-semibold py-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        {t('signup.loading.creatingAccount')}
                      </>
                    ) : (
                      t('signup.buttons.completeRegistration')
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* Step 7: Success */}
            {step === 'complete' && (
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600 stroke-2" />
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{t('signup.success.accountCreatedTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('signup.success.welcomeMessage')}</p>
                </div>

                {/* Account Details */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">{t('signup.success.accountLabel')}</span>
                    <span className="font-semibold text-gray-900">{inputValue}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">{t('signup.success.roleLabel')}</span>
                    <span className="font-semibold text-gray-900 capitalize">{t(`signup.roles.${role}`)}</span>
                  </div>
                </div>

                {/* Continue Button */}
                <Button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-xl font-semibold py-3"
                >
                  {t('signup.buttons.continueToDashboard')}
                </Button>

                {/* Sign In Link */}
                <div className="text-center text-sm">
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
                    {t('signup.links.backToSignIn')}
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
