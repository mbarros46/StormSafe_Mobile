"use client"

import { StyleSheet, Animated } from "react-native"
import { useRouter } from "expo-router"
import { useEffect, useState, useRef } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from "../constants"
import Logo from "../components/ui/Logo"

export default function Index() {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()

    // Aguarda um pouco para garantir que o layout está montado
    const timer = setTimeout(() => {
      setIsReady(true)
      router.replace("/(tabs)")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <LinearGradient
      colors={[Colors.background, Colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Logo size="xl" showText={true} variant="light" />
      </Animated.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
})
