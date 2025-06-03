"use client"

import { useEffect, useRef } from "react"
import { Text, StyleSheet, Animated, Dimensions } from "react-native"
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "../../constants"

interface ToastProps {
  message: string
  type: "success" | "error" | "warning" | "info"
  visible: boolean
  onHide: () => void
  duration?: number
}

const { width } = Dimensions.get("window")

export default function Toast({ message, type, visible, onHide, duration = 3000 }: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      // Animação de entrada
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      // Auto hide
      const timer = setTimeout(() => {
        hideToast()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [visible])

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide()
    })
  }

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: Colors.success,
          icon: "✅",
          textColor: Colors.white,
        }
      case "error":
        return {
          backgroundColor: Colors.danger,
          icon: "❌",
          textColor: Colors.white,
        }
      case "warning":
        return {
          backgroundColor: Colors.warning,
          icon: "⚠️",
          textColor: Colors.white,
        }
      case "info":
        return {
          backgroundColor: Colors.primary,
          icon: "ℹ️",
          textColor: Colors.white,
        }
      default:
        return {
          backgroundColor: Colors.surface,
          icon: "📢",
          textColor: Colors.text,
        }
    }
  }

  const config = getToastConfig()

  if (!visible) return null

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.icon}>{config.icon}</Text>
      <Text style={[styles.message, { color: config.textColor }]}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    zIndex: 9999,
    ...Shadows.lg,
  },
  icon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  message: {
    flex: 1,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
})
