"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Alert, ScrollView, Animated } from "react-native"
import api from "../../services/api"
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Card from "../../components/ui/Card"

export default function Reportar() {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [loading, setLoading] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const successAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  const enviarRelato = async () => {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.")
      return
    }

    setLoading(true)
    try {
      await api.post("/relatos", { titulo: titulo.trim(), descricao: descricao.trim() })

      // Animação de sucesso
      Animated.sequence([
        Animated.timing(successAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(successAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      Alert.alert("Sucesso", "Relato enviado com sucesso! Obrigado por contribuir com a segurança da comunidade.")
      setTitulo("")
      setDescricao("")
    } catch (err) {
      Alert.alert("Erro", "Não foi possível enviar o relato. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 64 }}
    showsVerticalScrollIndicator={false}
  >
    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Text style={styles.headerIcon}>📢</Text>
        <Text style={styles.headerTitle}>Reportar Ocorrência</Text>
        <Text style={styles.headerSubtitle}>
          Ajude a comunidade reportando alagamentos e situações de risco
        </Text>
      </Card>

        {/* Formulário */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Informações da Ocorrência</Text>

          <Input
            label="Título do Alerta"
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Alagamento na Rua das Flores"
            maxLength={100}
          />

          <Input
            label="Descrição Detalhada"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva o local, gravidade, horário e outras informações relevantes..."
            multiline
            numberOfLines={4}
            style={styles.textArea}
            maxLength={500}
          />

          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Status padrão:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusIcon}>⚠️</Text>
              <Text style={styles.statusText}>ATENÇÃO</Text>
            </View>
          </View>

          <Button
            title={loading ? "Enviando..." : "Reportar Alerta"}
            onPress={enviarRelato}
            loading={loading}
            disabled={!titulo.trim() || !descricao.trim()}
            style={styles.submitButton}
          />
        </Card>

        {/* Dicas */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsIcon}>💡</Text>
          <Text style={styles.tipsTitle}>Dicas para um bom relato</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Seja específico sobre a localização</Text>
            <Text style={styles.tipItem}>• Informe o nível da água se possível</Text>
            <Text style={styles.tipItem}>• Mencione se há pessoas em risco</Text>
            <Text style={styles.tipItem}>• Inclua horário aproximado do início</Text>
          </View>
        </Card>

        {/* Animação de Sucesso */}
        <Animated.View
          style={[
            styles.successOverlay,
            {
              opacity: successAnim,
              transform: [
                {
                  scale: successAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
          pointerEvents="box-none"
        >
          <Card style={styles.successCard}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Relato Enviado!</Text>
            <Text style={styles.successText}>Obrigado por contribuir com a segurança da comunidade</Text>
          </Card>
        </Animated.View>
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
    lineHeight: 22,
  },
  formCard: {
    marginBottom: Spacing.xl,
  },
  formTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  statusInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
  },
  statusLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  statusIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
  },
  submitButton: {
    marginTop: Spacing.md,
  },
  tipsCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    overflow: "hidden",
  },
  tipsIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  tipsTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  tipsList: {
    gap: Spacing.sm,
  },
  tipItem: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  successOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.overlay,
    padding: Spacing.lg,
  },
  successCard: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderColor: Colors.success,
    borderWidth: 2,
  },
  successIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  successTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.success,
    marginBottom: Spacing.sm,
  },
  successText: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    textAlign: "center",
  },
})
