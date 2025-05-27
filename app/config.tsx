import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Config() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
    // Aqui você implementaria a lógica real para mudar o tema
    console.log('Modo Escuro:', !isDarkMode);
  };

  const clearAllData = async () => {
    try {
      // Isso limpará todo o AsyncStorage. Use com cuidado!
      await AsyncStorage.clear();
      Alert.alert('Sucesso', 'Dados limpos com sucesso!');
      console.log('Dados do AsyncStorage limpos.');
    } catch (e) {
      console.error('Erro ao limpar dados:', e);
      Alert.alert('Erro', 'Ocorreu um erro ao limpar os dados.');
    }
  };

  const handleNotificationSetting = () => {
    // Simular configuração de notificações
    Alert.alert('Notificações', 'Configurações de notificações simuladas.');
    console.log('Botão de configuração de notificações clicado.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Modo Escuro</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Limpar Dados Locais</Text>
        <Button title="Limpar" onPress={clearAllData} color="red" />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Configurar Notificações</Text>
        <Button title="Configurar" onPress={handleNotificationSetting} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 18,
  },
}); 