"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  email: string
  username: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  register: (email: string, username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email: string, password: string): boolean => {
    // In a real app, this would make an API call to validate credentials
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userInfo = {
        email: foundUser.email,
        username: foundUser.username,
      }

      setUser(userInfo)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userInfo))
      return true
    }

    return false
  }

  const register = (email: string, username: string, password: string): boolean => {
    // In a real app, this would make an API call to create a user
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    const userExists = users.some((u: any) => u.email === email || u.username === username)

    if (userExists) {
      return false
    }

    // Create new user
    const newUser = { email, username, password }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Auto login after registration
    const userInfo = {
      email,
      username,
    }

    setUser(userInfo)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userInfo))

    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

