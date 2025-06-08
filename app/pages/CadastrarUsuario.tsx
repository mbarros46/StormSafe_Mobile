import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createUsuario, Usuario } from '../../services/api/usuarioService';

export default function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const salvar = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const novoUsuario: Usuario = {
      nome,
      email,
      senha,
      telefone,
      tipoUsuario: 'USER',
    };

    createUsuario(novoUsuario);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <Button title="Cadastrar" onPress={salvar} />
    </View>
  );
}
