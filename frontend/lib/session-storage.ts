export interface TutoringSession {
  id: string
  title: string
  subject: string
  scheduledTime: string
  duration: number // in minutes
  status: 'upcoming' | 'live' | 'completed'
  description: string
  createdAt: string
  updatedAt: string
}

const SESSIONS_STORAGE_KEY = 'tutoring_sessions'

// Generate a unique ID for new sessions
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get all sessions from localStorage
export function getAllSessions(): TutoringSession[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(SESSIONS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading sessions from localStorage:', error)
    return []
  }
}

// Save a new session to localStorage
export function saveSession(session: Omit<TutoringSession, 'id' | 'createdAt' | 'updatedAt'>): TutoringSession {
  const newSession: TutoringSession = {
    ...session,
    id: generateSessionId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  const existingSessions = getAllSessions()
  const updatedSessions = [...existingSessions, newSession]
  
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions))
    return newSession
  } catch (error) {
    console.error('Error saving session to localStorage:', error)
    throw new Error('Failed to save session')
  }
}

// Update an existing session
export function updateSession(sessionId: string, updates: Partial<TutoringSession>): TutoringSession | null {
  const sessions = getAllSessions()
  const sessionIndex = sessions.findIndex(s => s.id === sessionId)
  
  if (sessionIndex === -1) {
    console.error('Session not found:', sessionId)
    return null
  }
  
  const updatedSession: TutoringSession = {
    ...sessions[sessionIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  sessions[sessionIndex] = updatedSession
  
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions))
    return updatedSession
  } catch (error) {
    console.error('Error updating session in localStorage:', error)
    return null
  }
}

// Delete a session
export function deleteSession(sessionId: string): boolean {
  const sessions = getAllSessions()
  const filteredSessions = sessions.filter(s => s.id !== sessionId)
  
  if (filteredSessions.length === sessions.length) {
    console.error('Session not found for deletion:', sessionId)
    return false
  }
  
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(filteredSessions))
    return true
  } catch (error) {
    console.error('Error deleting session from localStorage:', error)
    return false
  }
}

// Get sessions by status
export function getSessionsByStatus(status: 'upcoming' | 'live' | 'completed'): TutoringSession[] {
  return getAllSessions().filter(session => session.status === status)
}

// Check if a session is scheduled for today
export function isSessionToday(scheduledTime: string): boolean {
  const sessionDate = new Date(scheduledTime)
  const today = new Date()
  
  return sessionDate.toDateString() === today.toDateString()
}

// Check if a session is scheduled for tomorrow
export function isSessionTomorrow(scheduledTime: string): boolean {
  const sessionDate = new Date(scheduledTime)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  return sessionDate.toDateString() === tomorrow.toDateString()
}

// Clear all sessions (for testing/reset purposes)
export function clearAllSessions(): void {
  try {
    localStorage.removeItem(SESSIONS_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing sessions from localStorage:', error)
  }
}

// Get session count statistics
export function getSessionStats() {
  const sessions = getAllSessions()
  
  return {
    total: sessions.length,
    upcoming: sessions.filter(s => s.status === 'upcoming').length,
    live: sessions.filter(s => s.status === 'live').length,
    completed: sessions.filter(s => s.status === 'completed').length,
    today: sessions.filter(s => isSessionToday(s.scheduledTime)).length,
    tomorrow: sessions.filter(s => isSessionTomorrow(s.scheduledTime)).length
  }
}
