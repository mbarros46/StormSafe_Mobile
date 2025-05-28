"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native"
import { Colors } from "../../constants/Colors"
import { Typography } from "../../constants/Typography"
import { Spacing } from "../../constants/Spacing"
import Card from "../../components/ui/Card"

export default function Mapa() {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  const sensores = [
    { icon: "🌧️", name: "Pluviômetro", status: "Normal", value: "12mm/h" },
    { icon: "🌊", name: "Nível do Rio", status: "Atenção", value: "2.3m" },
    { icon: "💧", name: "Umidade", status: "Normal", value: "78%" },
    { icon: "🌡️", name: "Temperatura", status: "Normal", value: "24°C" },
  ]

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 64}}
      showsVerticalScrollIndicator={false}
      >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Região Atual */}
        <Card style={styles.regionCard}>
          <Text style={styles.regionIcon}>📍</Text>
          <Text style={styles.regionTitle}>Região Monitorada</Text>
          <Text style={styles.regionName}>São Paulo - Centro</Text>
          <Text style={styles.regionCoords}>Lat: -23.5505, Lng: -46.6333</Text>
        </Card>

        {/* Mapa Placeholder */}
        <Card style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapTitle}>Mapa Interativo</Text>
            <Text style={styles.mapSubtitle}>Visualização em tempo real dos pontos de monitoramento</Text>
            <View style={styles.mapLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.success }]} />
                <Text style={styles.legendText}>Normal</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.warning }]} />
                <Text style={styles.legendText}>Atenção</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.danger }]} />
                <Text style={styles.legendText}>Perigo</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Sensores */}
        <Text style={styles.sectionTitle}>Sensores Ativos</Text>
        <View style={styles.sensorsGrid}>
          {sensores.map((sensor, index) => (
            <Card key={index} style={styles.sensorCard}>
              <Text style={styles.sensorIcon}>{sensor.icon}</Text>
              <Text style={styles.sensorName}>{sensor.name}</Text>
              <Text style={styles.sensorValue}>{sensor.value}</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: sensor.status === "Normal" ? Colors.success : Colors.warning },
                ]}
              >
                <Text style={styles.statusText}>{sensor.status}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Informações Adicionais */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoTitle}>Sobre o Monitoramento</Text>
          <Text style={styles.infoText}>
            Os dados são coletados em tempo real através de uma rede de sensores distribuídos pela região. As
            informações são atualizadas a cada 5 minutos.
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
  regionCard: {
    alignItems: "center",
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surfaceLight,
  },
  regionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  regionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  regionName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  regionCoords: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  mapCard: {
    marginBottom: Spacing.xl,
    padding: 0,
  },
  mapPlaceholder: {
    alignItems: "center",
    padding: Spacing.xl,
    minHeight: 200,
    justifyContent: "center",
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  mapTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  mapSubtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  mapLegend: {
    flexDirection: "row",
    gap: Spacing.lg,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  sensorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  sensorCard: {
    width: "47%",
    alignItems: "center",
    padding: Spacing.lg,
  },
  sensorIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  sensorName: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  sensorValue: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
  },
  infoCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    overflow: "hidden",
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
