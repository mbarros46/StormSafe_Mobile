import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { Alerta } from '../types';
import AlertaCard from '../../components/AlertaCard';

export default function Alertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarAlertas = async () => {
    try {
      const res = await api.get<Alerta[]>('/alertas');
      setAlertas(res.data);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar alertas.');
    } finally {
      setLoading(false);
    }
  };

  const deletarAlerta = async (id: number) => {
    try {
      await api.delete(`/alertas/${id}`);
      setAlertas(prev => prev.filter(a => a.id !== id));
      Alert.alert('Sucesso', 'Alerta removido.');
    } catch {
      Alert.alert('Erro', 'Não foi possível deletar o alerta.');
    }
  };

  useEffect(() => {
    carregarAlertas();
  }, []);

  const renderAlerta = ({ item }: { item: Alerta }) => (
    <View style={styles.cardWrapper}>
      <AlertaCard alerta={item} />
      <TouchableOpacity onPress={() => deletarAlerta(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alertas Atuais</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00BFFF" />
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAlerta}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#00BFFF', marginBottom: 16 },
  cardWrapper: { marginBottom: 16 },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff4444',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 4
  },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});