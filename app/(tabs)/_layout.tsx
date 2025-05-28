import React from "react"
import { Tabs } from "expo-router"
import { Colors, Typography } from "../../constants"
import { BlurView } from "expo-blur"
import { Platform } from "react-native"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Platform.OS === "ios" ? "transparent" : Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 10,
          position: "absolute",
        },
        tabBarBackground:
          Platform.OS === "ios" ? () => <BlurView intensity={100} style={{ flex: 1 }} tint="dark" /> : undefined,
        tabBarLabelStyle: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: Colors.background,
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: Typography.weights.semibold,
          fontSize: Typography.sizes.lg,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => <TabIcon name="🏠" color={color} size={size} />,
          headerTitle: "StormSafe",
        }}
      />
      <Tabs.Screen
        name="alertas"
        options={{
          title: "Alertas",
          tabBarIcon: ({ color, size }) => <TabIcon name="🔔" color={color} size={size} />,
          headerTitle: "Alertas Ativos",
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, size }) => <TabIcon name="🗺️" color={color} size={size} />,
          headerTitle: "Mapa de Riscos",
        }}
      />
      <Tabs.Screen
        name="reportar"
        options={{
          title: "Reportar",
          tabBarIcon: ({ color, size }) => <TabIcon name="📢" color={color} size={size} />,
          headerTitle: "Reportar Incidente",
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Config",
          tabBarIcon: ({ color, size }) => <TabIcon name="⚙️" color={color} size={size} />,
          headerTitle: "Configurações",
        }}
      />
    </Tabs>
  )
}

function TabIcon({ name, color, size }: { name: string; color: string; size: number }) {
  return (
    <span
      style={{
        fontSize: size + 2,
        filter: color === Colors.textMuted ? "grayscale(0.7)" : "none",
        opacity: color === Colors.textMuted ? 0.7 : 1,
      }}
    >
      {name}
    </span>
  )
}
