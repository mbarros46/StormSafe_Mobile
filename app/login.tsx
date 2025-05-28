import { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  async function handleLogin() {
    try {
      const response = await fetch('http://192.168.0.100:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      })

      if (!response.ok) throw new Error('Falha no login')

      const data = await response.json()
      await AsyncStorage.setItem('token', data.token)
      router.replace('/index') // vai redirecionar pra tela principal
    } catch (error: any) {
      Alert.alert('Erro ao entrar', error?.message || 'Erro desconhecido')
    }
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" value={senha} secureTextEntry onChangeText={setSenha} />
      <Button title="ENTRAR" onPress={handleLogin} />
    </View>
  )
}
