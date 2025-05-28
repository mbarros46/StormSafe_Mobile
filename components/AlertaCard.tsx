import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import type { Alerta } from "../app/types"
import Card from "./ui/Card"
import StatusBadge from "./ui/StatusBadge"
import { Colors, Typography, Spacing, BorderRadius, Shadows } from "../constants"

interface AlertaCardProps {
  alerta: Alerta
  onDelete?: (id: number) => void
  onPress?: () => void
}

export default function AlertaCard({ alerta, onDelete, onPress }: AlertaCardProps) {
  const fadeAnim = new Animated.Value(1)

  const statusConfig = {
    PERIGO: { color: Colors.danger, priority: "Alta" },
    ATENÇÃO: { color: Colors.warning, priority: "Média" },
    OK: { color: Colors.success, priority: "Baixa" },
  }

  const config = statusConfig[alerta.status]

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDelete?.(alerta.id)
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Agora mesmo"
    if (diffInHours < 24) return `${diffInHours}h atrás`

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Card style={[styles.card, { borderLeftColor: config.color }]} variant="elevated">
          <View style={styles.header}>
            <StatusBadge status={alerta.status} size="sm" />
            <View style={styles.priority}>
              <Text style={styles.priorityLabel}>Prioridade:</Text>
              <Text style={[styles.priorityValue, { color: config.color }]}>{config.priority}</Text>
            </View>
          </View>

          <Text style={styles.title}>{alerta.titulo}</Text>

          <View style={styles.footer}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeIcon}>🕐</Text>
              <Text style={styles.timeText}>{formatDate(alerta.data)}</Text>
            </View>

            {onDelete && (
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.deleteButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    marginBottom: Spacing.md,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  priority: {
    alignItems: "flex-end",
  },

  priorityLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },

  priorityValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },

  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeights.normal * Typography.sizes.lg,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  timeIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },

  timeText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },

  deleteButton: {
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    ...Shadows.sm,
  },

  deleteIcon: {
    fontSize: 16,
  },
})
