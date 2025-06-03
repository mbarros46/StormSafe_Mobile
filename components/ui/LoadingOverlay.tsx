"use client"
import { View, Text, StyleSheet, Modal } from "react-native"
import { Colors, Typography, Spacing } from "../../constants"
import LoadingSpinner from "./LoadingSpinner"

interface LoadingOverlayProps {
  visible: boolean
  message?: string
}

export default function LoadingOverlay({ visible, message = "Carregando..." }: LoadingOverlayProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LoadingSpinner size="large" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing["2xl"],
    alignItems: "center",
    minWidth: 150,
  },
  message: {
    marginTop: Spacing.lg,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    textAlign: "center",
  },
})
