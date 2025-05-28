import React from "react"
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Colors, Typography, BorderRadius, Shadows } from "../../constants"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "danger" | "warning" | "ghost" | "outline"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  disabled?: boolean
  gradient?: boolean
  icon?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  gradient = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [styles.base, styles[variant], styles[size], disabled && styles.disabled, style]

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ]

  const ButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" || variant === "danger" ? Colors.white : Colors.primary}
          size="small"
        />
      ) : (
        <>
          {icon && <Text style={[styles.icon, styles[`${size}Icon`]]}>{icon}</Text>}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </>
  )

  const gradientColors: string[] =
  Colors.gradients?.[variant === "primary" || variant === "danger" || variant === "warning" ? variant : "primary"] ??
  [Colors.primary, Colors.primaryLight]

  if (gradient && (variant === "primary" || variant === "danger" || variant === "warning")) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.base, styles[size], disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, styles[size]]}
        >
          <ButtonContent />
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
      <ButtonContent />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...Shadows.md,
  },

  gradient: {
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  warning: {
    backgroundColor: Colors.warning,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  // Sizes
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 52,
  },
  xl: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },

  // Text styles
  text: {
    fontWeight: Typography.weights.semibold,
    textAlign: "center",
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.text,
  },
  dangerText: {
    color: Colors.white,
  },
  warningText: {
    color: Colors.white,
  },
  ghostText: {
    color: Colors.primary,
  },
  outlineText: {
    color: Colors.primary,
  },

  // Size text
  smText: {
    fontSize: Typography.sizes.sm,
  },
  mdText: {
    fontSize: Typography.sizes.base,
  },
  lgText: {
    fontSize: Typography.sizes.lg,
  },
  xlText: {
    fontSize: Typography.sizes.xl,
  },

  // Icons
  icon: {
    marginRight: 8,
  },
  smIcon: {
    fontSize: 16,
  },
  mdIcon: {
    fontSize: 18,
  },
  lgIcon: {
    fontSize: 20,
  },
  xlIcon: {
    fontSize: 22,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
})
