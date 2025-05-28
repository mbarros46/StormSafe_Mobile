import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../../services/api';

export default function Reportar() {
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState<'PERIGO' | 'ATENÇÃO' | 'OK'>('ATENÇÃO');

  const enviarAlerta = async () => {
    if (!titulo) {
      Alert.alert('Erro', 'Preencha o título.');
      return;
    }

    try {
      await api.post('/alertas', {
        titulo,
        status,
        data: new Date().toISOString()
      });
      Alert.alert('Sucesso', 'Alerta enviado com sucesso!');
      setTitulo('');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar o alerta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportar Alerta</Text>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex: Enchente na Rua B"
      />
      <Button title="Enviar" onPress={enviarAlerta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  title: { fontSize: 22, color: '#00BFFF', marginBottom: 12 },
  label: { color: '#ccc', marginBottom: 4 },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 8,
    marginBottom: 16,
    borderRadius: 6
  }
});
