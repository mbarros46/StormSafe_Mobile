"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Animated, Linking, TouchableOpacity } from "react-native"
import { Colors } from "../../constants/Colors";
import { Typography } from "../../constants/Typography";
import { Spacing } from "../../constants/Spacing";
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

export default function Sobre() {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  const abrirLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir link:", err))
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <Text style={styles.logo}>🌧️ StormSafe</Text>
          <Text style={styles.version}>Versão 1.0.0</Text>
          <Text style={styles.tagline}>Protegendo comunidades através da tecnologia</Text>
        </Card>

        {/* Missão */}
        <Card style={styles.missionCard}>
          <Text style={styles.missionIcon}>🎯</Text>
          <Text style={styles.missionTitle}>Nossa Missão</Text>
          <Text style={styles.missionText}>
            Desenvolver soluções tecnológicas inovadoras para monitoramento de riscos climáticos, fornecendo alertas em
            tempo real que protegem vidas e propriedades contra enchentes e alagamentos.
          </Text>
        </Card>

        {/* Funcionalidades */}
        <Card style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>Principais Funcionalidades</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔔</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Alertas em Tempo Real</Text>
                <Text style={styles.featureDescription}>Notificações instantâneas sobre riscos climáticos</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📍</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Monitoramento Geográfico</Text>
                <Text style={styles.featureDescription}>Visualização de dados por região e sensores</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📢</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Relatos da Comunidade</Text>
                <Text style={styles.featureDescription}>Sistema colaborativo de reportes de ocorrências</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Dados em Tempo Real</Text>
                <Text style={styles.featureDescription}>Informações atualizadas de sensores meteorológicos</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Tecnologia */}
        <Card style={styles.techCard}>
          <Text style={styles.techIcon}>⚡</Text>
          <Text style={styles.techTitle}>Tecnologia</Text>
          <Text style={styles.techText}>
            Desenvolvido com React Native e Expo, o StormSafe utiliza APIs modernas para coleta e processamento de dados
            meteorológicos, garantindo informações precisas e atualizadas.
          </Text>
          <View style={styles.techStack}>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Frontend:</Text>
              <Text style={styles.techValue}>React Native + Expo</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Backend:</Text>
              <Text style={styles.techValue}>Node.js + Express</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Dados:</Text>
              <Text style={styles.techValue}>APIs Meteorológicas</Text>
            </View>
          </View>
        </Card>

        {/* Equipe */}
        <Card style={styles.teamCard}>
          <Text style={styles.teamIcon}>👥</Text>
          <Text style={styles.teamTitle}>Equipe de Desenvolvimento</Text>
          <Text style={styles.teamText}>
            Projeto desenvolvido por uma equipe multidisciplinar de engenheiros, desenvolvedores e especialistas em
            meteorologia, unidos pelo objetivo de criar soluções que salvam vidas.
          </Text>
        </Card>

        {/* Contato */}
        <Card style={styles.contactCard}>
          <Text style={styles.contactIcon}>📧</Text>
          <Text style={styles.contactTitle}>Entre em Contato</Text>
          <Text style={styles.contactText}>Tem sugestões, dúvidas ou quer contribuir com o projeto?</Text>

          <View style={styles.contactButtons}>
            <Button
              title="Github"
              onPress={() => abrirLink("https://github.com/mbarros46/StormSafe_Mobile.git")}
              variant="secondary"
              size="sm"
            />
            <Button
              title="Suporte"
              onPress={() => abrirLink("mailto:suporte@stormsafe.com.br")}
              variant="secondary"
              size="sm"
            />
          </View>
        </Card>

    
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 StormSafe. Todos os direitos reservados.</Text>
          <Text style={styles.footerSubtext}>Feito com ❤️ para proteger comunidades</Text>
        </View>
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
  logo: {
    fontSize: Typography.sizes["4xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  version: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: Typography.sizes.lg,
    color: Colors.text,
    textAlign: "center",
    fontStyle: "italic",
  },
  missionCard: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surfaceLight,
  },
  missionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  missionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  missionText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  featuresCard: {
    marginBottom: Spacing.xl,
  },
  featuresTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  featuresList: {
    gap: Spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  techCard: {
    marginBottom: Spacing.xl,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  techIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  techTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  techText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  techStack: {
    gap: Spacing.sm,
  },
  techItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  techLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  techValue: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
    fontWeight: Typography.weights.medium,
  },
  teamCard: {
    marginBottom: Spacing.xl,
  },
  teamIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  teamTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  teamText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  contactCard: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surfaceLight,
  },
  contactIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  contactTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  contactText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  contactButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  licenseCard: {
    marginBottom: Spacing.xl,
  },
  licenseIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  licenseTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  licenseText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  linkText: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  footer: {
    alignItems: "center",
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  footerSubtext: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
})
