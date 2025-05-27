import { View, Text, StyleSheet } from 'react-native';
import { Alerta } from '../app/types';

export default function AlertaCard({ alerta }: { alerta: Alerta }) {
  const statusColor = {
    PERIGO: '#FF4500',
    ATENÇÃO: '#FFD700',
    OK: '#32CD32'
  }[alerta.status];

  return (
    <View style={[styles.card, { borderLeftColor: statusColor }]}>
      <Text style={styles.titulo}>{alerta.titulo}</Text>
      <Text style={styles.status}>Status: {alerta.status}</Text>
      <Text style={styles.data}>Data: {new Date(alerta.data).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderRadius: 8
  },
  titulo: { fontSize: 18, color: '#fff', marginBottom: 4 },
  status: { color: '#ccc' },
  data: { color: '#888', fontSize: 12 }
});