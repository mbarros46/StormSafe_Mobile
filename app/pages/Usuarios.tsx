import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { getUsuarios, deleteUsuario, Usuario } from '../../services/api/usuarioService';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    setLoading(true);
    const dados = await getUsuarios();
    setUsuarios(dados);
    setLoading(false);
  };

  useEffect(() => {
    carregar();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#6200ee" />;

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.idUsuario?.toString() ?? ''}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>Nome: {item.nome}</Text>
            <Text>Email: {item.email}</Text>
            <Button title="Excluir" onPress={() => deleteUsuario(item.idUsuario!).then(carregar)} />
          </View>
        )}
      />
    </View>
  );
}
