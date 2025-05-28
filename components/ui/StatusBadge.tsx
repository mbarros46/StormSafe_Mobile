import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../../constants/Colors"
import { BorderRadius } from "../../constants/BorderRadius"
import { Typography } from "../../constants/Typography"


interface StatusBadgeProps {
  status: "PERIGO" | "ATENÇÃO" | "OK"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

export default function StatusBadge({ status, size = "md", showIcon = true }: StatusBadgeProps) {
  const config = {
    PERIGO: {
      color: Colors.danger,
      label: "PERIGO",
      icon: "🚨",
      textColor: Colors.white,
    },
    ATENÇÃO: {
      color: Colors.warning,
      label: "ATENÇÃO",
      icon: "⚠️",
      textColor: Colors.white,
    },
    OK: {
      color: Colors.success,
      label: "SEGURO",
      icon: "✅",
      textColor: Colors.white,
    },
  }

  const statusConfig = config[status]

  return (
    <View style={[styles.badge, styles[size], { backgroundColor: statusConfig.color }]}>
      {showIcon && <Text style={[styles.icon, styles[`${size}Icon`]]}>{statusConfig.icon}</Text>}
      <Text style={[styles.text, styles[`${size}Text`], { color: statusConfig.textColor }]}>{statusConfig.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
  },

  // Sizes
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  lg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  // Icons
  icon: {
    marginRight: 4,
  },
  smIcon: {
    fontSize: 12,
  },
  mdIcon: {
    fontSize: 14,
  },
  lgIcon: {
    fontSize: 16,
  },

  // Text
  text: {
    fontWeight: Typography.weights.bold,
  },
  smText: {
    fontSize: Typography.sizes.xs,
  },
  mdText: {
    fontSize: Typography.sizes.sm,
  },
  lgText: {
    fontSize: Typography.sizes.base,
  },
})
