import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export interface AuthResult {
  uid: string
  email: string | null
}

const buildAuthError = (message: string, code?: string) => {
  const error = new Error(message) as Error & { code?: string }
  if (code) {
    error.code = code
  }
  return error
}

const formatAuthError = (error: unknown) => {
  if (error instanceof Error && 'code' in error && typeof error.code === 'string') {
    const code = error.code

    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'The email or password you entered is incorrect.'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.'
      case 'auth/weak-password':
        return 'Please choose a stronger password with at least 6 characters.'
      case 'auth/network-request-failed':
        return 'A network issue interrupted the request. Please try again.'
      default:
        break
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Authentication failed. Please try again.'
}

export const register = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    return {
      uid: credential.user.uid,
      email: credential.user.email,
    }
  } catch (error) {
    const message = formatAuthError(error)
    throw buildAuthError(message, 'auth/register-failed')
  }
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return {
      uid: credential.user.uid,
      email: credential.user.email,
    }
  } catch (error) {
    const message = formatAuthError(error)
    throw buildAuthError(message, 'auth/login-failed')
  }
}

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    const message = formatAuthError(error)
    throw buildAuthError(message, 'auth/logout-failed')
  }
}
