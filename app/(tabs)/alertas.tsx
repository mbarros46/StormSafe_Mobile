import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import api from '../../services/api';
import { Alerta } from '../types';
import AlertaCard from '../../components/AlertaCard';

const fallbackAlertas: Alerta[] = [
  { id: 1, titulo: 'Enchente na Zona Norte', status: 'PERIGO', data: new Date().toISOString() },
  { id: 2, titulo: 'Alerta preventivo em Pinheiros', status: 'ATENÇÃO', data: new Date().toISOString() },
  { id: 3, titulo: 'Condições normais em Moema', status: 'OK', data: new Date().toISOString() }
];

export default function Alertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Alerta[]>('/alertas')
      .then(res => setAlertas(res.data))
      .catch(() => setAlertas(fallbackAlertas))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alertas de Enchente</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00BFFF" />
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AlertaCard alerta={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 }
});