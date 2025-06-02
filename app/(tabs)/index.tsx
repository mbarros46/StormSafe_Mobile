"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, ScrollView, Dimensions } from "react-native"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from "../../constants/Colors"
import { Typography } from "../../constants/Typography"
import { Spacing } from "../../constants/Spacing"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import StatusBadge from "../../components/ui/StatusBadge"
import Logo from "../../components/ui/Logo"
import { CloudRainIcon, ShieldIcon, MapPinIcon } from "../../components/ui/CustomIcons"

const { width } = Dimensions.get("window")

export default function Home() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section com Background */}
      <View style={styles.heroSection}>
        <LinearGradient colors={[Colors.background, Colors.backgroundLight]} style={styles.heroGradient}>
          <Animated.View
            style={[
              styles.heroContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            {/* Logo e Título */}
            <View style={styles.logoContainer}>
              <Logo size="lg" showText={true} variant="light" />
              <Text style={styles.tagline}>Monitoramento de riscos climáticos em tempo real</Text>
            </View>

            {/* Status Atual */}
            <Card variant="elevated" style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <Text style={styles.statusTitle}>Status Atual</Text>
                <StatusBadge status="OK" size="sm" />
              </View>
              <Text style={styles.statusDescription}>Todas as regiões monitoradas estão em condições normais</Text>
              <View style={styles.statusMetrics}>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>12</Text>
                  <Text style={styles.metricLabel}>Sensores Ativos</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>0</Text>
                  <Text style={styles.metricLabel}>Alertas Ativos</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>24°C</Text>
                  <Text style={styles.metricLabel}>Temperatura</Text>
                </View>
              </View>
            </Card>
          </Animated.View>
        </LinearGradient>
      </View>

      {/* Ações Rápidas */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.quickActions}>
          <Button
            title="Ver Alertas"
            onPress={() => router.push("/alertas")}
            variant="primary"
            size="lg"
            gradient
            icon="🔔"
            style={styles.primaryAction}
          />

          <View style={styles.secondaryActions}>
            <Button
              title="Mapa"
              onPress={() => router.push("/mapa")}
              variant="outline"
              size="md"
              icon="🗺️"
              style={styles.secondaryButton}
            />
            <Button
              title="Reportar"
              onPress={() => router.push("/reportar")}
              variant="warning"
              size="md"
              icon="📢"
              style={styles.secondaryButton}
            />
          </View>
        </View>

        {/* Cards Informativos */}
        <View style={styles.infoCards}>
          <Card variant="gradient" gradient={[Colors.primary, Colors.primaryLight]} style={styles.infoCard}>
            <CloudRainIcon size={32} color={Colors.white} />
            <Text style={styles.infoTitle}>Dados em Tempo Real</Text>
            <Text style={styles.infoDescription}>Monitoramento contínuo de 12 sensores distribuídos pela região</Text>
          </Card>

          <Card variant="outlined" style={styles.infoCard}>
            <ShieldIcon size={32} color={Colors.danger} />
            <Text style={styles.infoTitle}>Sistema de Alertas</Text>
            <Text style={styles.infoDescription}>Notificações instantâneas para situações de risco</Text>
          </Card>

          <Card variant="outlined" style={styles.infoCard}>
            <MapPinIcon size={32} color={Colors.success} />
            <Text style={styles.infoTitle}>Comunidade Ativa</Text>
            <Text style={styles.infoDescription}>Relatos colaborativos para melhor cobertura</Text>
          </Card>
        </View>

        {/* Dica de Segurança */}
        <Card variant="elevated" style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipTitle}>Dica de Segurança</Text>
          </View>
          <Text style={styles.tipText}>
            Em caso de chuva forte, evite áreas baixas e próximas a rios. Mantenha sempre um kit de emergência
            preparado.
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

  heroSection: {
    height: 400,
    marginBottom: Spacing["3xl"],
  },

  heroGradient: {
    flex: 1,
    paddingTop: Spacing["4xl"],
  },

  heroContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing["4xl"],
  },

  tagline: {
    fontSize: Typography.sizes.lg,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.lg,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },

  statusCard: {
    backgroundColor: Colors.surface,
  },

  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  statusTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },

  statusDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },

  statusMetrics: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  metric: {
    alignItems: "center",
  },

  metricValue: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },

  metricLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: "center",
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100, // Espaço para o tab bar
  },

  sectionTitle: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },

  quickActions: {
    marginBottom: Spacing["4xl"],
  },

  primaryAction: {
    marginBottom: Spacing.lg,
  },

  secondaryActions: {
    flexDirection: "row",
    gap: Spacing.md,
  },

  secondaryButton: {
    flex: 1,
  },

  infoCards: {
    gap: Spacing.lg,
    marginBottom: Spacing["4xl"],
  },

  infoCard: {
    alignItems: "center",
    padding: Spacing.xl,
  },

  infoTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: "center",
    marginTop: Spacing.md,
  },

  infoDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },

  tipCard: {
    backgroundColor: Colors.surfaceLight,
    borderColor: Colors.warning,
    borderWidth: 1,
  },

  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  tipIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },

  tipTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },

  tipText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
})
