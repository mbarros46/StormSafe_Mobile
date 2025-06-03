"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import Toast from "../components/ui/Toast"

interface ToastContextData {
  showToast: (message: string, type: "success" | "error" | "warning" | "info") => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showWarning: (message: string) => void
  showInfo: (message: string) => void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

interface ToastProviderProps {
  children: ReactNode
}

interface ToastState {
  visible: boolean
  message: string
  type: "success" | "error" | "warning" | "info"
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "info",
  })

  const showToast = (message: string, type: "success" | "error" | "warning" | "info") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }))
  }

  const showSuccess = (message: string) => showToast(message, "success")
  const showError = (message: string) => showToast(message, "error")
  const showWarning = (message: string) => showToast(message, "warning")
  const showInfo = (message: string) => showToast(message, "info")

  const value: ToastContextData = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onHide={hideToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider")
  }
  return context
}
