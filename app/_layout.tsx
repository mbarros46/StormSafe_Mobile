import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="alertas" options={{ title: 'Alertas' }} />
      <Tabs.Screen name="mapa" options={{ title: 'Mapa' }} />
      <Tabs.Screen name="reportar" options={{ title: 'Reportar' }} />
      <Tabs.Screen name="config" options={{ title: 'Configurações' }} />
    </Tabs>
  );
}
