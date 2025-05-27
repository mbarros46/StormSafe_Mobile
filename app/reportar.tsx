import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function Reportar() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    // Simulando envio para uma API
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { // Substitua por sua URL real
        title: title,
        body: description,
        userId: 1,
      });
      console.log('Relato enviado:', response.data);
      Alert.alert('Sucesso', 'Seu relato foi enviado com sucesso!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao enviar relato:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar seu relato.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportar Ocorrência</Text>
      <TextInput
        style={styles.input}
        placeholder="Título do Relato"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Descrição (campo multiline)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Button title="Enviar Relato" onPress={handleSubmit} />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
}); 