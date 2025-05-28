import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import type { Alerta } from "../app/types"
import { Colors } from "../constants/Colors";
import { Typography } from "../constants/Typography";
import { Spacing } from "../constants/Spacing";
import Card from "./ui/Card"

interface AlertaCardProps {
  alerta: Alerta
  onDelete?: (id: number) => void
}

export default function AlertaCard({ alerta, onDelete }: AlertaCardProps) {
  const fadeAnim = new Animated.Value(1)

  const statusConfig = {
    PERIGO: { color: Colors.perigo, label: "PERIGO", icon: "🚨" },
    ATENÇÃO: { color: Colors.atencao, label: "ATENÇÃO", icon: "⚠️" },
    OK: { color: Colors.ok, label: "SEGURO", icon: "✅" },
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
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card style={[styles.card, { borderLeftColor: config.color }]}>
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            <Text style={styles.icon}>{config.icon}</Text>
            <View style={[styles.statusBadge, { backgroundColor: config.color }]}>
              <Text style={styles.statusText}>{config.label}</Text>
            </View>
          </View>
          {onDelete && (
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>{alerta.titulo}</Text>
        <Text style={styles.date}>📅 {formatDate(alerta.data)}</Text>
      </Card>
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
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.white,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  deleteButton: {
    padding: Spacing.xs,
    borderRadius: 8,
    backgroundColor: Colors.danger,
  },
  deleteIcon: {
    fontSize: 16,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  date: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
})
