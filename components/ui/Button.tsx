import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { Colors } from "../../constants/Colors"
import { Spacing } from "../../constants/Spacing"

type ButtonVariant = "primary" | "secondary" | "outline"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
}

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  variant = "primary",
  size = "md",
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  sm: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  md: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  lg: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
})
