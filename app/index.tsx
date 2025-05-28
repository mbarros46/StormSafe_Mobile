import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function Index() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        router.replace('/(tabs)/alertas') // rota principal protegida
      } else {
        router.replace('/login')
      }
      setLoading(false)
    })
  }, [])

  if (loading) return null

  return null
}
