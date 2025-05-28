import React from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Colors, BorderRadius, Shadows, Spacing } from "../../constants"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  padding?: keyof typeof Spacing
  variant?: "default" | "elevated" | "outlined" | "gradient"
  gradient?: string[]
}

export default function Card({ children, style, padding = "lg", variant = "default", gradient }: CardProps) {
  if (variant === "gradient" && gradient) {
    return (
      <View style={[styles.base, style]}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { padding: Spacing[padding] }]}
        >
          {children}
        </LinearGradient>
      </View>
    )
  }

  return <View style={[styles.base, styles[variant], { padding: Spacing[padding] }, style]}>{children}</View>
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
  },

  default: {
    backgroundColor: Colors.surface,
    ...Shadows.md,
  },

  elevated: {
    backgroundColor: Colors.surface,
    ...Shadows.lg,
  },

  outlined: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },

  gradient: {
    borderRadius: BorderRadius.xl,
    ...Shadows.lg,
  },
})
