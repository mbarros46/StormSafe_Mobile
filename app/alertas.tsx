import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockAlerts = [
  { id: '1', title: 'Enchente na Zona Norte', status: 'PERIGO', date: '2023-10-27' },
  { id: '2', title: 'Nível do rio subindo', status: 'ATENÇÃO', date: '2023-10-27' },
  { id: '3', title: 'Situação normalizada Centro', status: 'OK', date: '2023-10-26' },
  { id: '4', title: 'Alagamento na Zona Sul', status: 'PERIGO', date: '2023-10-27' },
  { id: '5', title: 'Monitoramento Barragem', status: 'ATENÇÃO', date: '2023-10-27' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PERIGO':
      return 'red';
    case 'ATENÇÃO':
      return 'yellow';
    case 'OK':
      return 'green';
    default:
      return 'gray';
  }
};

export default function Alertas() {
  const renderItem = ({ item }: { item: typeof mockAlerts[0] }) => (
    <View style={[styles.alertItem, { borderColor: getStatusColor(item.status) }]}>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertStatus}>Status: {item.status}</Text>
      <Text style={styles.alertDate}>Data: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockAlerts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  alertItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderLeftWidth: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  alertStatus: {
    fontSize: 16,
    marginBottom: 3,
  },
  alertDate: {
    fontSize: 14,
    color: '#666',
  },
}); 