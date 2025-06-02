// app/(tabs)/mapa.tsx

"use client";

import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Button,
  Platform,
  Dimensions,
} from "react-native";
import Card from "../../components/ui/Card";
import { WebView } from "react-native-webview";
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";

export default function Mapa() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const sensores = [
    { icon: "🌧️", name: "Pluviômetro", status: "Normal", value: "12mm/h" },
    { icon: "🌊", name: "Nível do Rio", status: "Atenção", value: "2.3m" },
    { icon: "💧", name: "Umidade", status: "Normal", value: "78%" },
    { icon: "🌡️", name: "Temperatura", status: "Normal", value: "24°C" },
  ];

  // URL padrão do embed do Google Maps (mapa personalizado)
  const mapaEmbedUrl =
    "https://www.google.com/maps/d/u/0/embed?mid=1Ru7-QilgaPibncptnM20yp92Fd5TbVI&ehbc=2E312F";

  // Dimensões para iframe em Web
  const { width } = Dimensions.get("window");
  const iframeHeight = 300;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 64 }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Região Atual */}
        <Card style={styles.regionCard}>
          <Text style={styles.regionIcon}>📍</Text>
          <Text style={styles.regionTitle}>Região Monitorada</Text>
          <Text style={styles.regionName}>São Paulo – Centro</Text>
          <Text style={styles.regionCoords}>Lat: -23.5505, Lng: -46.6333</Text>
        </Card>

        {/* Mapa Interativo */}
        <Card style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Mapa de Riscos – São Paulo</Text>
            <Text style={styles.mapSubtitle}>
              Visualização em tempo real dos pontos de monitoramento
            </Text>
          </View>

          <View style={styles.mapContainer}>
            {mapError ? (
              <View style={styles.mapFallback}>
                <Text style={styles.mapIcon}>🗺️</Text>
                <Text style={styles.mapFallbackTitle}>
                  Mapa Temporariamente Indisponível
                </Text>
                <Text style={styles.mapFallbackText}>
                  Não foi possível carregar o mapa interativo. Verifique sua
                  conexão com a internet.
                </Text>
                <Button
                  title="Tentar Novamente"
                  onPress={() => setMapError(false)}
                  color={Colors.primary}
                />
              </View>
            ) : Platform.OS === "web" ? (
              // Se for Web, renderiza <iframe> diretamente
              <View style={{ width: width - Spacing.lg * 2, height: iframeHeight }}>
                <iframe
                  src={mapaEmbedUrl}
                  width="100%"
                  height={iframeHeight.toString()}
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </View>
            ) : (
              // Android / iOS: usa WebView
              <WebView
                source={{ uri: mapaEmbedUrl }}
                style={styles.webview}
                startInLoadingState={true}
                renderLoading={() => (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando mapa...</Text>
                  </View>
                )}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn("WebView error: ", nativeEvent);
                  setMapError(true);
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
              />
            )}
          </View>

          <View style={styles.mapLegend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: Colors.success }]}
              />
              <Text style={styles.legendText}>Normal</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: Colors.warning }]}
              />
              <Text style={styles.legendText}>Atenção</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: Colors.danger }]}
              />
              <Text style={styles.legendText}>Perigo</Text>
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
                  {
                    backgroundColor:
                      sensor.status === "Normal" ? Colors.success : Colors.warning,
                  },
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
            Os dados são coletados em tempo real através de uma rede de sensores
            distribuídos pela região. As informações são atualizadas a cada 5
            minutos.
          </Text>
        </Card>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  /* Região Atual */
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

  /* Card do Mapa */
  mapCard: {
    marginBottom: Spacing.xl,
    padding: 0,
  },
  mapHeader: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mapTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  mapSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  mapContainer: {
    height: 300,
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
  loadingText: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  mapFallback: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.surfaceLight,
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  mapFallbackTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  mapFallbackText: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },

  /* Legenda do Mapa */
  mapLegend: {
    flexDirection: "row",
    gap: Spacing.lg,
    padding: Spacing.md,
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

  /* Sensores */
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

  /* Informações Adicionais */
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
});
