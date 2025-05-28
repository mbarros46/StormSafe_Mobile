"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Colors } from "../../constants/Colors"
import { Typography } from "../../constants/Typography"
import { Spacing } from "../../constants/Spacing"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"

export default function Home() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🌧️ StormSafe</Text>
          <Text style={styles.subtitle}>Monitoramento de riscos climáticos em tempo real</Text>
        </View>

        {/* Status Cards */}
        <View style={styles.statusGrid}>
          <Card style={[styles.statusCard, styles.safeCard]}>
            <Text style={styles.statusIcon}>✅</Text>
            <Text style={styles.statusTitle}>Seguro</Text>
            <Text style={styles.statusDesc}>Sem alertas ativos</Text>
          </Card>

          <Card style={[styles.statusCard, styles.monitoringCard]}>
            <Text style={styles.statusIcon}>📡</Text>
            <Text style={styles.statusTitle}>Monitorando</Text>
            <Text style={styles.statusDesc}>Sistema ativo</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <View style={styles.actionButtons}>
            <Button title="Ver Alertas" onPress={() => router.push("/alertas")} style={styles.primaryAction} />

            <View style={styles.secondaryActions}>
              <Button
                title="Mapa"
                onPress={() => router.push("/mapa")}
                variant="secondary"
                size="sm"
                style={styles.secondaryButton}
              />
              <Button
                title="Reportar"
                onPress={() => router.push("/reportar")}
                variant="secondary"
                size="sm"
                style={styles.secondaryButton}
              />
            </View>
          </View>
        </Card>

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoTitle}>Dica de Segurança</Text>
          <Text style={styles.infoText}>
            Mantenha sempre um kit de emergência em casa com água, alimentos não perecíveis e lanternas.
          </Text>
        </Card>
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  logo: {
    fontSize: Typography.sizes["4xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  statusGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statusCard: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.lg,
  },
  safeCard: {
    borderColor: Colors.success,
    borderWidth: 1,
  },
  monitoringCard: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  statusIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  statusTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  statusDesc: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: "center",
  },
  actionsCard: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  actionButtons: {
    gap: Spacing.md,
  },
  primaryAction: {
    marginBottom: Spacing.sm,
  },
  secondaryActions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  secondaryButton: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: Colors.surfaceLight,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  infoTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
})
