import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../../services/api';

export default function Reportar() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const enviarRelato = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await api.post('/relatos', { titulo, descricao });
      Alert.alert('Sucesso', 'Relato enviado com sucesso!');
      setTitulo('');
      setDescricao('');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar o relato.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Relato</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex: Enchente em rua X"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva o local, gravidade, etc."
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={4}
      />

      <Button title="Enviar Relato" onPress={enviarRelato} color="#00BFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#111' },
  label: { color: '#fff', marginBottom: 8, fontSize: 16 },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#333',
    borderWidth: 1
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  }
});