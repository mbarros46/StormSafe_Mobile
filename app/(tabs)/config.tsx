import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function Config() {
  const [notificacoes, setNotificacoes] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('notificacoes').then(value => {
      if (value !== null) setNotificacoes(value === 'true');
    });
  }, []);

  const toggleSwitch = async () => {
    const novoValor = !notificacoes;
    setNotificacoes(novoValor);
    await AsyncStorage.setItem('notificacoes', String(novoValor));
    Alert.alert('Configuração salva', `Notificações ${novoValor ? 'ativadas' : 'desativadas'}.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Receber notificações</Text>
        <Switch value={notificacoes} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00BFFF', marginBottom: 24 },
  label: { fontSize: 16, color: '#fff' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  }
});