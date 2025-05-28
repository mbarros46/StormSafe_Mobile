export const Typography = {
  // Família de fontes
  fontFamily: {
    regular: "System", // Usa a fonte do sistema
    medium: "System",
    semibold: "System",
    bold: "System",
  },

  // Tamanhos de fonte
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
    "6xl": 48,
  },

  // Pesos de fonte
  weights: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Estilos predefinidos
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 38,
    },
    h2: {
      fontSize: 28,
      fontWeight: "600" as const,
      lineHeight: 34,
    },
    h3: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 30,
    },
    h4: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 26,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: "400" as const,
      lineHeight: 27,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: "600" as const,
      lineHeight: 20,
    },
  },
}

export default Typography
