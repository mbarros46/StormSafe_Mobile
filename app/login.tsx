import React, { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'
import { useRouter } from 'expo-router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password: senha })
      const { token } = response.data
      await AsyncStorage.setItem('token', token)
      router.replace('/home') // redireciona para a tela principal
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas')
    }
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  )
}
