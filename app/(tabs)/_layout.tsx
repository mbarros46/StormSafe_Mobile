import { Tabs } from "expo-router"
import { Colors } from "../../constants/Colors";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: Colors.background,
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <TabIcon name="🏠" color={color} />,
          headerTitle: "StormSafe",
        }}
      />
      <Tabs.Screen
        name="alertas"
        options={{
          title: "Alertas",
          tabBarIcon: ({ color }) => <TabIcon name="🔔" color={color} />,
          headerTitle: "Alertas Ativos",
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => <TabIcon name="📍" color={color} />,
          headerTitle: "Mapa de Riscos",
        }}
      />
      <Tabs.Screen
        name="reportar"
        options={{
          title: "Reportar",
          tabBarIcon: ({ color }) => <TabIcon name="➕" color={color} />,
          headerTitle: "Reportar Ocorrência",
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Config",
          tabBarIcon: ({ color }) => <TabIcon name="⚙️" color={color} />,
          headerTitle: "Configurações",
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          tabBarIcon: ({ color }) => <TabIcon name="ℹ️" color={color} />,
          headerTitle: "Sobre o StormSafe",
        }}
      />
    </Tabs>
  )
}

function TabIcon({ name, color }: { name: string; color: string }) {
  return <span style={{ fontSize: 20, filter: `grayscale(${color === Colors.textMuted ? 1 : 0})` }}>{name}</span>
}
