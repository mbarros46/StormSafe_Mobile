"use client"

import { useRef, useEffect } from "react"
import { View, StyleSheet, Animated, Easing } from "react-native"
import { Colors } from "../../constants"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  color?: string
}

export default function LoadingSpinner({ size = "medium", color = Colors.primary }: LoadingSpinnerProps) {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0)
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin())
    }
    spin()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const sizeMap = {
    small: 20,
    medium: 30,
    large: 40,
  }

  const spinnerSize = sizeMap[size]

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderColor: `${color}20`,
            borderTopColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 50,
  },
})
