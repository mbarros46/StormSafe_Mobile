"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Animated, Alert, TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from "../../constants/Colors"
import { Typography } from "../../constants/Typography"
import { Spacing } from "../../constants/Spacing"
import { BorderRadius } from "../../constants/BorderRadius"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

export default function Perfil() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "cadastro">("login")
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const router = useRouter()

  // Estados do formulário de login
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  // Estados do formulário de cadastro
  const [nomeCompleto, setNomeCompleto] = useState("")
  const [emailCadastro, setEmailCadastro] = useState("")
  const [senhaCadastro, setSenhaCadastro] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  const baseUrl =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : "http://192.168.15.128:8080"

  useEffect(() => {
    verificarAutenticacao()
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const verificarAutenticacao = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      setIsLoggedIn(!!token)
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error)
    } finally {
      setCheckingAuth(false)
    }
  }

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), senha }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Falha no login")
      }

      const data = await response.json()
      await AsyncStorage.setItem("token", data.token)
      setIsLoggedIn(true)
      setEmail("")
      setSenha("")
      Alert.alert("Sucesso", "Login realizado com sucesso!")
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error.message || "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  const handleCadastro = async () => {
    if (!nomeCompleto.trim() || !emailCadastro.trim() || !senhaCadastro.trim() || !confirmarSenha.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.")
      return
    }

    if (senhaCadastro !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.")
      return
    }

    if (senhaCadastro.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/auth/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeCompleto.trim(),
          email: emailCadastro.trim(),
          senha: senhaCadastro,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Falha no cadastro")
      }

      Alert.alert("Sucesso", "Cadastro realizado com sucesso! Agora você pode fazer login.", [
        {
          text: "OK",
          onPress: () => {
            setActiveTab("login")
            setNomeCompleto("")
            setEmailCadastro("")
            setSenhaCadastro("")
            setConfirmarSenha("")
          },
        },
      ])
    } catch (error: any) {
      Alert.alert("Erro no cadastro", error.message || "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    Alert.alert("Confirmar Logout", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("token")
            setIsLoggedIn(false)
            Alert.alert("Sucesso", "Logout realizado com sucesso!")
          } catch (error) {
            Alert.alert("Erro", "Não foi possível fazer logout.")
          }
        },
      },
    ])
  }

  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Verificando autenticação...</Text>
      </View>
    )
  }

  if (isLoggedIn) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <LinearGradient
          colors={[Colors.primary, "#0F2B68"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <Text style={styles.userName}>Usuário StormSafe</Text>
              <View style={styles.userStatusBadge}>
                <Text style={styles.userStatusText}>Conta Ativa</Text>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Estatísticas do Usuário */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Alertas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Relatos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Regiões</Text>
            </View>
          </View>

          {/* Menu de Opções */}
          <Text style={styles.sectionTitle}>Gerenciar Conta</Text>
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/alertas")}>
              <View style={[styles.menuIcon, { backgroundColor: Colors.primaryLight }]}>
                <Text style={styles.menuIconText}>🔔</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Meus Alertas</Text>
                <Text style={styles.menuDescription}>Gerencie seus alertas personalizados</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento")}
            >
              <View style={[styles.menuIcon, { backgroundColor: "#4C6EF5" }]}>
                <Text style={styles.menuIconText}>📋</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Histórico de Relatos</Text>
                <Text style={styles.menuDescription}>Veja seus relatos enviados</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/config")}>
              <View style={[styles.menuIcon, { backgroundColor: "#4DABF7" }]}>
                <Text style={styles.menuIconText}>⚙️</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Configurações</Text>
                <Text style={styles.menuDescription}>Personalize o aplicativo</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </Card>

          {/* Informações da Conta */}
          <Text style={styles.sectionTitle}>Informações da Conta</Text>
          <Card style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>Ativo</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Membro desde</Text>
              <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Último acesso</Text>
              <Text style={styles.infoValue}>Hoje</Text>
            </View>
          </Card>

          {/* Botão de Logout */}
          <Button
            title="Sair da Conta"
            onPress={handleLogout}
            variant="danger"
            size="lg"
            icon="🚪"
            style={styles.logoutButton}
          />
        </Animated.View>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <LinearGradient
        colors={["#1A365D", "#2A4A80"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.authHeaderGradient}
      >
        <Animated.View
          style={[
            styles.authHeaderContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.appLogo}>🌧️</Text>
          <Text style={styles.appName}>StormSafe</Text>
          <Text style={styles.appTagline}>Monitoramento inteligente de riscos climáticos</Text>
        </Animated.View>
      </LinearGradient>

      <Animated.View
        style={[
          styles.authContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Tabs de Login/Cadastro */}
        <View style={styles.authTabs}>
          <TouchableOpacity
            style={[styles.authTab, activeTab === "login" && styles.authTabActive]}
            onPress={() => setActiveTab("login")}
          >
            <Text style={[styles.authTabText, activeTab === "login" && styles.authTabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.authTab, activeTab === "cadastro" && styles.authTabActive]}
            onPress={() => setActiveTab("cadastro")}
          >
            <Text style={[styles.authTabText, activeTab === "cadastro" && styles.authTabTextActive]}>Cadastro</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <Card style={styles.authCard}>
          {activeTab === "login" ? (
            <>
              <Text style={styles.authCardTitle}>Bem-vindo de volta!</Text>
              <Text style={styles.authCardSubtitle}>Entre com suas credenciais para continuar</Text>

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input label="Senha" value={senha} onChangeText={setSenha} placeholder="Sua senha" secureTextEntry />

              <Button
                title={loading ? "Entrando..." : "Entrar"}
                onPress={handleLogin}
                loading={loading}
                disabled={!email.trim() || !senha.trim()}
                style={styles.authButton}
                gradient
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.authCardTitle}>Crie sua conta</Text>
              <Text style={styles.authCardSubtitle}>Junte-se à comunidade StormSafe</Text>

              <Input
                label="Nome Completo"
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                placeholder="Seu nome completo"
              />
              <Input
                label="Email"
                value={emailCadastro}
                onChangeText={setEmailCadastro}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Senha"
                value={senhaCadastro}
                onChangeText={setSenhaCadastro}
                placeholder="Mínimo 6 caracteres"
                secureTextEntry
              />
              <Input
                label="Confirmar Senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholder="Digite a senha novamente"
                secureTextEntry
              />

              <Button
                title={loading ? "Criando conta..." : "Criar Conta"}
                onPress={handleCadastro}
                loading={loading}
                disabled={
                  !nomeCompleto.trim() || !emailCadastro.trim() || !senhaCadastro.trim() || !confirmarSenha.trim()
                }
                style={styles.authButton}
                gradient
              />
            </>
          )}
        </Card>

        {/* Uso sem conta */}
        <Card style={styles.guestCard}>
          <Text style={styles.guestTitle}>Prefere usar sem conta?</Text>
          <Text style={styles.guestText}>
            Você pode usar o StormSafe sem criar uma conta. O login é opcional e permite salvar suas preferências e
            histórico de alertas.
          </Text>
          <Button
            title="Continuar como Visitante"
            onPress={() => router.push("/(tabs)")}
            variant="outline"
            size="md"
            style={styles.guestButton}
          />
        </Card>

        {/* Benefícios */}
        <Card style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Benefícios da conta</Text>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Alertas personalizados para sua região</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Histórico de relatos e notificações</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Configurações salvas em todos os dispositivos</Text>
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

  // Header para usuário logado
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  avatarText: {
    fontSize: 50,
  },
  userName: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  userStatusBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.4)",
  },
  userStatusText: {
    color: "#10B981",
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  content: {
    padding: Spacing.lg,
  },

  // Estatísticas
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },

  // Seções
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },

  // Menu de opções
  menuCard: {
    padding: 0,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  menuIconText: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  menuArrow: {
    fontSize: 24,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },

  // Informações da conta
  infoCard: {
    padding: Spacing.md,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  infoLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  infoValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
  },
  infoDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },

  // Botão de logout
  logoutButton: {
    marginTop: Spacing.xl,
  },

  // Autenticação
  authHeaderGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  authHeaderContent: {
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  appLogo: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: Typography.sizes["4xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  appTagline: {
    fontSize: Typography.sizes.base,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  authContent: {
    padding: Spacing.lg,
  },
  authTabs: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    padding: 4,
  },
  authTab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: "center",
    borderRadius: BorderRadius.md,
  },
  authTabActive: {
    backgroundColor: Colors.primary,
  },
  authTabText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textMuted,
  },
  authTabTextActive: {
    color: Colors.white,
  },
  authCard: {
    marginBottom: Spacing.lg,
  },
  authCardTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  authCardSubtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  authButton: {
    marginTop: Spacing.md,
  },
  forgotPassword: {
    alignSelf: "center",
    marginTop: Spacing.md,
    padding: Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
  },

  // Uso sem conta
  guestCard: {
    marginBottom: Spacing.lg,
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    borderColor: "rgba(59, 130, 246, 0.2)",
    borderWidth: 1,
  },
  guestTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  guestText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
  guestButton: {
    alignSelf: "center",
  },

  // Benefícios
  benefitsCard: {
    marginBottom: Spacing.xl,
  },
  benefitsTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  benefitIcon: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
    marginRight: Spacing.sm,
    width: 20,
  },
  benefitText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    flex: 1,
  },
})
