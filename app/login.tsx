import { useState } from 'react'
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  async function handleLogin() {
    try {
      const response = await fetch('http://192.168.15.128:8080/auth/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      })

      if (!response.ok) throw new Error('Falha no login')

      const data = await response.json()
      await AsyncStorage.setItem('token', data.token)
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Erro ao entrar', error.message || 'Erro desconhecido')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        secureTextEntry
        onChangeText={setSenha}
      />
      <Button title="ENTRAR" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8
  }
})
