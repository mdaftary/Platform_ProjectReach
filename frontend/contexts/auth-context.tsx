"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type UserRole = "parent" | "volunteer" | "admin"

interface User {
  id: string
  username: string
  email?: string
  phone?: string
  studentName?: string
  parentName?: string
  school?: string
  role: UserRole
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
  clearStoredUsers: () => void
}

interface LoginCredentials {
  identifier: string // email, phone, or username
  password: string
  method: 'email' | 'phone' | 'username'
}

interface SignupData {
  method: 'email' | 'phone' | 'manual'
  email?: string
  phone?: string
  username: string
  password: string
  studentName?: string
  parentName?: string
  school?: string
  schoolCode?: string
  role: UserRole
}

interface MockUser extends User {
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default mock user data for demonstration
const DEFAULT_MOCK_USERS: MockUser[] = [
  {
    id: "1",
    username: "emma_parent",
    email: "parent@example.com",
    phone: "+852 9876 5432",
    password: "password123",
    role: "parent" as UserRole,
    createdAt: new Date().toISOString()
  },
  {
    id: "2", 
    username: "testuser",
    email: "test@example.com",
    password: "test123",
    role: "parent" as UserRole,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    username: "volunteer_user",
    email: "volunteer@example.com",
    password: "volunteer123",
    role: "volunteer" as UserRole,
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    username: "admin_user",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as UserRole,
    createdAt: new Date().toISOString() 
  },
  {
    id: "5",
    username: "phone_user",
    phone: "12345678",
    password: "phone123",
    role: "parent" as UserRole,
    createdAt: new Date().toISOString()
  }
]

// Function to get users from localStorage or use defaults
const getMockUsers = (): MockUser[] => {
  console.log('🔍 [AUTH] Loading users from localStorage...')
  try {
    const storedUsers = localStorage.getItem('mock_users')
    if (storedUsers) {
      const users = JSON.parse(storedUsers) as MockUser[]
      console.log(`✅ [AUTH] Loaded ${users.length} users from localStorage:`, users.map(u => ({ id: u.id, username: u.username, email: u.email, phone: u.phone, role: u.role })))
      return users
    }
    console.log('📝 [AUTH] No stored users found, using defaults')
  } catch (error) {
    console.error('❌ [AUTH] Error loading users from localStorage:', error)
  }
  console.log(`🔄 [AUTH] Using ${DEFAULT_MOCK_USERS.length} default users`)
  return [...DEFAULT_MOCK_USERS]
}

// Function to save users to localStorage
const saveMockUsers = (users: MockUser[]) => {
  console.log(`💾 [AUTH] Saving ${users.length} users to localStorage...`)
  console.log('📋 [AUTH] Users being saved:', users.map(u => ({ id: u.id, username: u.username, email: u.email, phone: u.phone, role: u.role })))
  try {
    localStorage.setItem('mock_users', JSON.stringify(users))
    console.log('✅ [AUTH] Users saved successfully')
  } catch (error) {
    console.error('❌ [AUTH] Error saving users to localStorage:', error)
  }
}

// Initialize mock users from localStorage
let MOCK_USERS: MockUser[] = getMockUsers()

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password']

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Start with false instead of true
  const router = useRouter()
  const pathname = usePathname()
  
  // Note: Starting with isLoading = false for frontend-only mode

  // Check if current route is public
  console.log('Pathname', pathname)
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

  // Initialize auth state and reload mock users from localStorage
  useEffect(() => {
    console.log('🚀 [AUTH] Initializing auth provider...')
    try {
      // Reload mock users from localStorage
      console.log('🔄 [AUTH] Reloading mock users from localStorage...')
      MOCK_USERS = getMockUsers()
      
      const storedUser = localStorage.getItem('auth_user')
      const storedToken = localStorage.getItem('auth_token')
      
      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser)
        console.log('👤 [AUTH] Found stored user session:', { id: userData.id, username: userData.username, role: userData.role })
        setUser(userData)
      } else {
        console.log('❓ [AUTH] No stored user session found')
      }
      console.log('✅ [AUTH] Auth provider initialized successfully')
    } catch (error) {
      console.error('❌ [AUTH] Error initializing auth:', error)
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
    }
  }, [])

  // Redirect logic when visiting /login
  useEffect(() => {
    if (!isLoading) {
      if (!user && !isPublicRoute) {
        // Redirect to login if not authenticated and trying to access protected route
        router.push('/login')
      } else if (user && user.role === 'admin' && isPublicRoute) {
        // Redirect to dashboard if authenticated and trying to access auth pages (for admin)
        console.log('Redirecting to admin', isPublicRoute)
        router.push('/admin')
      } else if (user && user.role === 'parent' && isPublicRoute) {
        // Redirect to dashboard if authenticated and trying to access auth pages (for parents)
        router.push('/')
      } else if (user && user.role === 'volunteer' && isPublicRoute) {
        // Redirect to dashboard if authenticated and trying to access auth pages (for volunteers)
        router.push('/volunteer')
      }
    }
  }, [user, isLoading, isPublicRoute, router, pathname])

  const login = async (credentials: LoginCredentials): Promise<void> => {
    console.log('🔐 [LOGIN] Starting login process...')
    console.log('📝 [LOGIN] Credentials:', { identifier: credentials.identifier, method: credentials.method, passwordLength: credentials.password.length })
    setIsLoading(true)
    
    try {
      // Mock authentication - in real app, call your API
      console.log('⏳ [LOGIN] Simulating network delay...')
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
      
      // Reload fresh data from localStorage to include newly signed up users
      console.log('🔄 [LOGIN] Reloading fresh user data...')
      MOCK_USERS = getMockUsers()
      
      // Find user by identifier and password
      console.log('🔍 [LOGIN] Searching for user...')
      const mockUser = MOCK_USERS.find((u: MockUser) => {
        const identifierMatch = 
          u.email === credentials.identifier || 
          u.phone === credentials.identifier || 
          u.username === credentials.identifier
        
        // For phone/email, allow special "verified_user" password (simulating SMS/email verification)
        const passwordMatch = u.password === credentials.password || 
          (credentials.password === 'verified_user' && (credentials.method === 'phone' || credentials.method === 'email'))
        
        const match = identifierMatch && passwordMatch
        if (identifierMatch) {
          console.log(`🔍 [LOGIN] Found matching identifier for user: ${u.username} (${u.role})`)
          if (!passwordMatch) {
            console.log('❌ [LOGIN] Password does not match')
          }
        }
        return match
      })

      if (!mockUser) {
        console.log('❌ [LOGIN] No user found with provided credentials')
        alert('Invalid credentials. 無效的憑證。')
        throw new Error('Invalid credentials')
      }

      console.log('✅ [LOGIN] User authenticated successfully:', { id: mockUser.id, username: mockUser.username, role: mockUser.role })

      // Create user object (exclude password)
      const { password, ...userData } = mockUser
      const authenticatedUser: User = userData

      // Store in localStorage (in real app, store secure tokens)
      console.log('💾 [LOGIN] Storing user session...')
      localStorage.setItem('auth_user', JSON.stringify(authenticatedUser))
      localStorage.setItem('auth_token', 'mock_jwt_token_' + Date.now())

      setUser(authenticatedUser)
      
      // Role-based redirect
      console.log(`🚀 [LOGIN] Redirecting ${authenticatedUser.role} user...`)
      if (authenticatedUser.role === 'volunteer') {
        console.log('➡️ [LOGIN] Redirecting to /volunteer')
        router.push('/volunteer')
      } else if (authenticatedUser.role === 'admin') {
        console.log('➡️ [LOGIN] Redirecting to /admin')
        router.push('/admin')
      } else {
        console.log('➡️ [LOGIN] Redirecting to /')
        router.push('/')
      }
      setIsLoading(false)
      console.log('🎉 [LOGIN] Login process completed successfully')
    } catch (error) {
      console.error('❌ [LOGIN] Login failed:', error)
      setIsLoading(false)
      throw error
    }
  }

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Mock Google authentication
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Create mock Google user - default to parent role
      const googleUser: User = {
        id: "google_" + Date.now(),
        username: "google_user",
        email: "user@gmail.com",
        role: "parent",
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('auth_user', JSON.stringify(googleUser))
      localStorage.setItem('auth_token', 'mock_google_token_' + Date.now())

      setUser(googleUser)
      setIsLoading(false) // Fix: Set loading to false after successful login
      // Role-based redirect
      if (googleUser.role === 'volunteer') {
        router.push('/volunteer')
      } else if (googleUser.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const signup = async (userData: SignupData): Promise<void> => {
    console.log('📝 [SIGNUP] Starting signup process...')
    console.log('👤 [SIGNUP] User data:', { 
      username: userData.username, 
      email: userData.email, 
      phone: userData.phone, 
      role: userData.role, 
      method: userData.method,
      hasPassword: !!userData.password 
    })
    setIsLoading(true)
    
    try {
      // Mock signup - in real app, call your API
      console.log('⏳ [SIGNUP] Simulating network delay...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reload fresh data from localStorage to avoid conflicts
      console.log('🔄 [SIGNUP] Reloading fresh user data...')
      MOCK_USERS = getMockUsers()
      
      // Check if username already exists in the current user list
      console.log('🔍 [SIGNUP] Checking for existing users...')
      const existingUser = MOCK_USERS.find((u: MockUser) => {
        if (u.username) {
          if (u.username === userData.username) {
            console.log('❌ [SIGNUP] User already exists:', { 
              existing: { username: u.username, email: u.email, phone: u.phone },
              attempted: { username: userData.username, email: userData.email, phone: userData.phone }
            })
            alert('User already exists with this username, email, or phone. 用戶名稱、電郵或電話號碼已經被使用。')
            throw new Error('User already exists with this username, email, or phone')
            return true
          }
        }
        if (u.email) {
          if (u.email === userData.email) {
            console.log('❌ [SIGNUP] User already exists:', { 
              existing: { username: u.username, email: u.email, phone: u.phone },
              attempted: { username: userData.username, email: userData.email, phone: userData.phone }
            })
            alert('User already exists with this username, email, or phone. 用戶名稱、電郵或電話號碼已經被使用。')
            throw new Error('User already exists with this username, email, or phone')
            return true
          }
        }
        if (u.phone) {
          if (u.phone === userData.phone) {
            console.log('❌ [SIGNUP] User already exists:', { 
              existing: { username: u.username, email: u.email, phone: u.phone },
              attempted: { username: userData.username, email: userData.email, phone: userData.phone }
            })
            alert('User already exists with this username, email, or phone. 用戶名稱、電郵或電話號碼已經被使用。')
            throw new Error('User already exists with this username, email, or phone')
            return true
          }
        }
      }
      )
      if (existingUser) {
        console.log('❌ [SIGNUP] User already exists:', { 
          existing: { username: existingUser.username, email: existingUser.email, phone: existingUser.phone },
          attempted: { username: userData.username, email: userData.email, phone: userData.phone }
        })
        throw new Error('User already exists with this username, email, or phone')
      }

      if (!userData.schoolCode) {
        alert("An email has been sent to the school to verify your account. 相關學校將會驗證你的身份。")
      }

      console.log('✅ [SIGNUP] No conflicts found, creating new user...')

      // Create new user
      const newUser: User = {
        id: "user_" + Date.now(),
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        studentName: userData.studentName,
        parentName: userData.parentName,
        school: userData.school,
        role: userData.role,
        createdAt: new Date().toISOString()
      }

      console.log('👤 [SIGNUP] New user created:', { id: newUser.id, username: newUser.username, role: newUser.role })

      // Create user with password for the mock users list
      const newUserWithPassword: MockUser = {
        ...newUser,
        password: userData.password
      }

      // Add to mock users and save to localStorage
      console.log('💾 [SIGNUP] Adding user to stored users...')
      MOCK_USERS.push(newUserWithPassword)
      saveMockUsers(MOCK_USERS)

      // Store current authenticated user
      console.log('🔐 [SIGNUP] Storing user session...')
      localStorage.setItem('auth_user', JSON.stringify(newUser))
      localStorage.setItem('auth_token', 'mock_signup_token_' + Date.now())

      setUser(newUser)
      setIsLoading(false) // Fix: Set loading to false after successful signup
      
      // Role-based redirect
      console.log(`🚀 [SIGNUP] Redirecting ${newUser.role} user...`)
      if (newUser.role === 'volunteer') {
        console.log('➡️ [SIGNUP] Redirecting to /volunteer')
        router.push('/volunteer')
      } else if (newUser.role === 'admin') {
        console.log('➡️ [SIGNUP] Redirecting to /admin')
        router.push('/admin')
      } else {
        console.log('➡️ [SIGNUP] Redirecting to /')
        router.push('/')
      }
      console.log('🎉 [SIGNUP] Signup process completed successfully')
    } catch (error) {
      console.error('❌ [SIGNUP] Signup failed:', error)
      setIsLoading(false)
      throw error
    }
  }

  const logout = () => {
    console.log('🚪 [LOGOUT] Starting logout process...')
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    setUser(null)
    console.log('✅ [LOGOUT] User session cleared')
    console.log('➡️ [LOGOUT] Redirecting to /login')
    router.push('/login')
  }

  const clearStoredUsers = () => {
    console.log('🗑️ [DEBUG] Clearing all stored users...')
    localStorage.removeItem('mock_users')
    MOCK_USERS = [...DEFAULT_MOCK_USERS]
    console.log(`✅ [DEBUG] Cleared stored users, reset to ${DEFAULT_MOCK_USERS.length} defaults`)
    console.log('📋 [DEBUG] Default users:', DEFAULT_MOCK_USERS.map(u => ({ username: u.username, email: u.email, phone: u.phone, role: u.role })))
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    signup,
    logout,
    clearStoredUsers
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
