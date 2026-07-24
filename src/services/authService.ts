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

export const register = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    return {
      uid: credential.user.uid,
      email: credential.user.email,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw buildAuthError(error.message, 'auth/register-failed')
    }

    throw buildAuthError('Registration failed.', 'auth/register-failed')
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
    if (error instanceof Error) {
      throw buildAuthError(error.message, 'auth/login-failed')
    }

    throw buildAuthError('Login failed.', 'auth/login-failed')
  }
}

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    if (error instanceof Error) {
      throw buildAuthError(error.message, 'auth/logout-failed')
    }

    throw buildAuthError('Logout failed.', 'auth/logout-failed')
  }
}
