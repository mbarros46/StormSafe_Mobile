import { View, Text, StyleSheet, Image } from 'react-native';

export default function Mapa() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualização de Mapa</Text>
      <Image
        source={{ uri: 'https://i.imgur.com/fzHf3L8.png' }}
        style={styles.map}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 16, alignItems: 'center' },
  title: { fontSize: 20, color: '#00BFFF', marginBottom: 16 },
  map: { width: '100%', height: 300 }
});
