"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

interface User {
  id: string
  nome: string
  email: string
  telefone?: string
  tipoUsuario: "CIDADAO" | "GESTOR"
}

interface AuthContextData {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  nome: string
  email: string
  telefone: string
  tipoUsuario: "CIDADAO" | "GESTOR"
  senha: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const baseUrl =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : "http://192.168.15.128:8080"

  useEffect(() => {
    loadStoredUser()
  }, [])

  const loadStoredUser = async () => {
    try {
      setIsLoading(true)
      const token = await AsyncStorage.getItem("token")
      const userData = await AsyncStorage.getItem("user")

      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error)
      // Limpa dados corrompidos
      await AsyncStorage.multiRemove(["token", "user"])
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), senha }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Falha no login")
      }

      // Armazena token e dados do usuário
      await AsyncStorage.setItem("token", data.token)
      await AsyncStorage.setItem("user", JSON.stringify(data.user))

      setUser(data.user)
      return true
    } catch (error: any) {
      console.error("Erro no login:", error)
      Alert.alert("Erro ao entrar", error.message || "Erro desconhecido")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true)

      const response = await fetch(`${baseUrl}/auth/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: userData.nome.trim(),
          email: userData.email.trim(),
          telefone: userData.telefone.trim(),
          tipoUsuario: userData.tipoUsuario,
          senha: userData.senha,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Falha no cadastro")
      }

      Alert.alert("Sucesso", "Cadastro realizado com sucesso! Agora você pode fazer login.")
      return true
    } catch (error: any) {
      console.error("Erro no cadastro:", error)
      Alert.alert("Erro no cadastro", error.message || "Erro desconhecido")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await AsyncStorage.multiRemove(["token", "user"])
      setUser(null)
      Alert.alert("Sucesso", "Logout realizado com sucesso!")
    } catch (error) {
      console.error("Erro no logout:", error)
      Alert.alert("Erro", "Não foi possível fazer logout.")
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      AsyncStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextData = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
