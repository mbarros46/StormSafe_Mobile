import type React from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import { Colors } from "../../constants/Colors"
import { Spacing } from "../../constants/Spacing"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  padding?: keyof typeof Spacing
}

export default function Card({ children, style, padding = "md" }: CardProps) {
  return <View style={[styles.card, { padding: Spacing[padding] }, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
})
