"use client"

import { useEffect, useState, useRef } from "react"
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, Animated, RefreshControl } from "react-native"
import api from "../../services/api"
import type { Alerta } from "../types"
import AlertaCard from "../../components/AlertaCard"
import { Colors } from "../../constants/Colors"
import { Typography } from "../../constants/Typography"
import { Spacing } from "../../constants/Spacing"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

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
      Alert.alert("Erro de Conexão", "Não foi possível carregar os alertas. Verifique sua conexão.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const deletarAlerta = async (id: number) => {
    Alert.alert("Confirmar Exclusão", "Tem certeza que deseja remover este alerta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/alertas/${id}`)
            setAlertas((prev) => prev.filter((a) => a.id !== id))
            Alert.alert("Sucesso", "Alerta removido com sucesso!")
          } catch {
            Alert.alert("Erro", "Não foi possível deletar o alerta.")
          }
        },
      },
    ])
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
      <AlertaCard
        alerta={item}
        onDelete={deletarAlerta}
        onPress={() => {
          Alert.alert(item.titulo, `Status: ${item.status}\nData: ${new Date(item.data).toLocaleString("pt-BR")}`, [
            { text: "OK" },
          ])
        }}
      />
    </Animated.View>
  )

  const EmptyState = () => (
    <Card variant="elevated" style={styles.emptyCard}>
      <Text style={styles.emptyIcon}>🎉</Text>
      <Text style={styles.emptyTitle}>Nenhum alerta ativo</Text>
      <Text style={styles.emptyText}>
        Ótimas notícias! Não há alertas de risco no momento. Continue monitorando para se manter seguro.
      </Text>
      <Button
        title="Atualizar"
        onPress={() => carregarAlertas()}
        variant="outline"
        size="sm"
        style={styles.refreshButton}
      />
    </Card>
  )

  const LoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.loadingText}>Carregando alertas...</Text>
    </View>
  )

  const HeaderStats = () => {
    const alertasPorStatus = alertas.reduce(
      (acc, alerta) => {
        acc[alerta.status] = (acc[alerta.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return (
      <Card variant="elevated" style={styles.statsCard}>
        <Text style={styles.statsTitle}>Resumo dos Alertas</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.danger }]}>{alertasPorStatus.PERIGO || 0}</Text>
            <Text style={styles.statLabel}>Perigo</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.warning }]}>{alertasPorStatus.ATENÇÃO || 0}</Text>
            <Text style={styles.statLabel}>Atenção</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.success }]}>{alertasPorStatus.OK || 0}</Text>
            <Text style={styles.statLabel}>Seguro</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>{alertas.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </Card>
    )
  }

  if (loading) {
    return <LoadingState />
  }

  return (
    <View style={styles.container}>
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
        ListHeaderComponent={alertas.length > 0 ? HeaderStats : undefined}
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

  listContent: {
    padding: Spacing.lg,
    paddingBottom: 100, // Espaço para o tab bar
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

  statsCard: {
    marginBottom: Spacing.xl,
  },

  statsTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing.xs,
  },

  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },

  emptyCard: {
    alignItems: "center",
    padding: Spacing["4xl"],
    marginTop: Spacing["4xl"],
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.xl,
  },

  emptyTitle: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: "center",
  },

  emptyText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
    marginBottom: Spacing.xl,
  },

  refreshButton: {
    marginTop: Spacing.md,
  },
})
