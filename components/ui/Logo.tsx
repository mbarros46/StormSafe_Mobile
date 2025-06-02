import { View, Text, StyleSheet, Image } from "react-native"
import { Colors, Typography } from "../../constants"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  variant?: "light" | "dark"
}

export default function Logo({ size = "md", showText = true, variant = "light" }: LogoProps) {
  const logoSizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  }

  const textSizes = {
    sm: Typography.sizes.lg,
    md: Typography.sizes.xl,
    lg: Typography.sizes["3xl"],
    xl: Typography.sizes["5xl"],
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/stormsafe-logo.png")}
        style={[
          styles.logo,
          {
            width: logoSizes[size],
            height: logoSizes[size],
          },
        ]}
        resizeMode="contain"
      />
      {showText && (
        <Text
          style={[
            styles.text,
            {
              fontSize: textSizes[size],
              color: variant === "light" ? Colors.white : Colors.primary,
            },
          ]}
        >
          StormSafe
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    marginBottom: 8,
  },
  text: {
    fontWeight: Typography.weights.bold,
    textAlign: "center",
  },
})
