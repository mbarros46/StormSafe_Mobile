"use client"
import { useState } from "react"
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type TextInputProps,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from "react-native"
import { Colors, Typography } from "../../constants"
import { Spacing } from "../../constants/Spacing"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  validate?: (value: string) => string | undefined
}

export default function Input({
  label,
  error,
  helperText,
  required = false,
  validate,
  style,
  onChangeText,
  value,
  onFocus,       // repassa se o usuário quiser
  onBlur,        // repassa se o usuário quiser
  ...props       // qualquer outra prop de TextInput propagada
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [internalError, setInternalError] = useState<string>()
  const [hasBeenTouched, setHasBeenTouched] = useState(false)

  // Sempre utilizar o param `text: string`
  const handleChangeText = (text: string) => {
    onChangeText?.(text)

    if (hasBeenTouched && validate) {
      const validationError = validate(text)
      setInternalError(validationError)
    } else if (hasBeenTouched && required && !text.trim()) {
      setInternalError("Este campo é obrigatório")
    } else if (hasBeenTouched) {
      setInternalError(undefined)
    }
  }

  // Agora o handleBlur RECEBE o evento, mas ele ignora o parâmetro
  const handleBlurInternal = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    setHasBeenTouched(true)

    // Validações após o usuário sair do campo
    if (validate && value !== undefined) {
      const validationError = validate(value)
      setInternalError(validationError)
    } else if (required && (!value || !value.trim())) {
      setInternalError("Este campo é obrigatório")
    }

    // Se o usuário tiver passado um onBlur como prop, chamamos também
    onBlur?.(e)
  }

  // E para o onFocus, recebemos o evento mas não precisamos dele internamente
  const handleFocusInternal = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const currentError = error || internalError
  const showError = hasBeenTouched && !!currentError

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          showError && styles.inputError,
          style as any, // cast apenas para suprimir warning de TS se necessário
        ]}
        placeholderTextColor={Colors.textMuted}
        // Agora passamos a versão que recebe o evento
        onFocus={handleFocusInternal}
        onBlur={handleBlurInternal}
        onChangeText={handleChangeText}
        value={value}
        {...props}  // Propaga TODO o restante (keyboardType, secureTextEntry etc.)
      />

      {showError && <Text style={styles.errorText}>{currentError}</Text>}
      {helperText && !showError && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  required: {
    color: Colors.danger,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: Colors.danger,
    borderWidth: 2,
  },
  errorText: {
    fontSize: Typography.sizes.xs,
    color: Colors.danger,
    marginTop: Spacing.xs,
  },
  helperText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
})
