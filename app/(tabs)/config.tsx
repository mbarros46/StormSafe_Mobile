"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, Switch, StyleSheet, Alert, ScrollView, Animated } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Colors } from "../../constants/Colors"
import { Typography } from "../../constants/Typography"
import { Spacing } from "../../constants/Spacing"
import Card from "../../components/ui/Card"

export default function Config() {
  const [notificacoes, setNotificacoes] = useState(false)
  const [loading, setLoading] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    carregarConfiguracoes()
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  const carregarConfiguracoes = async () => {
    try {
      const value = await AsyncStorage.getItem("notificacoes")
      if (value !== null) {
        setNotificacoes(value === "true")
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleNotificacoes = async () => {
    try {
      const novoValor = !notificacoes
      setNotificacoes(novoValor)
      await AsyncStorage.setItem("notificacoes", String(novoValor))

      Alert.alert("Configuração Salva", `Notificações ${novoValor ? "ativadas" : "desativadas"} com sucesso!`, [
        { text: "OK" },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a configuração.")
      setNotificacoes(!notificacoes) // Reverte a mudança
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando configurações...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <Text style={styles.headerIcon}>⚙️</Text>
          <Text style={styles.headerTitle}>Configurações</Text>
          <Text style={styles.headerSubtitle}>Personalize sua experiência no StormSafe</Text>
        </Card>

        {/* Notificações */}
        <Card style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={styles.settingTitle}>Notificações</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Alertas Push</Text>
              <Text style={styles.settingDescription}>
                Receba notificações instantâneas sobre alertas de risco na sua região
              </Text>
            </View>
            <Switch
              value={notificacoes}
              onValueChange={toggleNotificacoes}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={notificacoes ? Colors.white : Colors.textMuted}
              ios_backgroundColor={Colors.border}
            />
          </View>
        </Card>

        {/* Sobre o App */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoIcon}>📱</Text>
          <Text style={styles.infoTitle}>Sobre o Aplicativo</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Versão:</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Última atualização:</Text>
              <Text style={styles.infoValue}>Janeiro 2025</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Desenvolvido por:</Text>
              <Text style={styles.infoValue}>Equipe StormSafe</Text>
            </View>
          </View>
        </Card>

        {/* Privacidade */}
        <Card style={styles.privacyCard}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyTitle}>Privacidade e Dados</Text>
          <Text style={styles.privacyText}>
            Seus dados são armazenados localmente no dispositivo. Apenas informações de alertas são enviadas para nossos
            servidores para melhorar o sistema de monitoramento.
          </Text>
        </Card>

        {/* Status do Sistema */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusIcon}>📡</Text>
            <Text style={styles.statusTitle}>Status do Sistema</Text>
          </View>
          <View style={styles.statusItems}>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
              <Text style={styles.statusText}>Servidor Online</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
              <Text style={styles.statusText}>Sensores Ativos</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
              <Text style={styles.statusText}>Dados Atualizados</Text>
            </View>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  headerCard: {
    alignItems: "center",
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surfaceLight,
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    textAlign: "center",
  },
  settingCard: {
    marginBottom: Spacing.xl,
  },
  settingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  settingTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingLabel: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  settingDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  infoCard: {
    marginBottom: Spacing.xl,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  infoTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  infoList: {
    gap: Spacing.sm,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  infoValue: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
    fontWeight: Typography.weights.medium,
  },
  privacyCard: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surfaceLight,
  },
  privacyIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  privacyTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  privacyText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  statusCard: {
    borderColor: Colors.success,
    borderWidth: 1,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  statusIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  statusTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  statusItems: {
    gap: Spacing.sm,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  statusText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
})
