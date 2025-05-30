"use client"

import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Colors, Typography } from "../constants"

export default function Index() {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Aguarda um pouco para garantir que o layout está montado
    const timer = setTimeout(() => {
      setIsReady(true)
      router.replace("/(tabs)")
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>🌧️</Text>
        <Text style={styles.title}>StormSafe</Text>
        <Text style={styles.subtitle}>Carregando...</Text>
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: Typography.sizes["4xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.textMuted,
  },
})
