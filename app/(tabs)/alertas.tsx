"use client"

import { useEffect, useState, useRef } from "react"
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, Animated, RefreshControl } from "react-native"
import api from "../../services/api"
import type { Alerta } from "../types"
import AlertaCard from "../../components/AlertaCard"
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";
import Card from "../../components/ui/Card"

export default function Alertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  const carregarAlertas = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true)
      const res = await api.get<Alerta[]>("/alertas")
      setAlertas(res.data)
    } catch (err) {
      Alert.alert("Erro", "Falha ao carregar alertas.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const deletarAlerta = async (id: number) => {
    try {
      await api.delete(`/alertas/${id}`)
      setAlertas((prev) => prev.filter((a) => a.id !== id))
      Alert.alert("Sucesso", "Alerta removido com sucesso!")
    } catch {
      Alert.alert("Erro", "Não foi possível deletar o alerta.")
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    carregarAlertas(true)
  }

  useEffect(() => {
    carregarAlertas()
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  const renderAlerta = ({ item, index }: { item: Alerta; index: number }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      }}
    >
      <AlertaCard alerta={item} onDelete={deletarAlerta} />
    </Animated.View>
  )

  const EmptyState = () => (
    <Card style={styles.emptyCard}>
      <Text style={styles.emptyIcon}>🎉</Text>
      <Text style={styles.emptyTitle}>Nenhum alerta ativo</Text>
      <Text style={styles.emptyText}>
        Ótimas notícias! Não há alertas de risco no momento. Continue monitorando para se manter seguro.
      </Text>
    </Card>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando alertas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alertas Ativos</Text>
        <Text style={styles.subtitle}>
          {alertas.length} {alertas.length === 1 ? "alerta" : "alertas"} encontrado{alertas.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAlerta}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={EmptyState}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  emptyCard: {
    alignItems: "center",
    padding: Spacing.xl,
    marginTop: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  emptyText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
})
