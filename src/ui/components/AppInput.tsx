import React from 'react';
import { View, TextInput, StyleSheet, Pressable, ViewStyle, TextInputProps } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import AppText from './AppText';

type Props = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  
  onBlur?: TextInputProps['onBlur'];

  // Right icon 
  rightIcon?: React.ReactNode;
  onPressRightIcon?: () => void;

  containerStyle?: ViewStyle;
};

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  onBlur,
  rightIcon,
  onPressRightIcon,
  containerStyle,
}: Props) {
  return (
    <View style={[styles.field, containerStyle]}>
      <AppText variant="label" style={styles.label}>
        {label}
      </AppText>

      <View style={[styles.inputWrap, error ? styles.inputWrapError : null]}>
        <TextInput
          style={[styles.input, rightIcon ? styles.inputWithRightPadding : null]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          textAlignVertical="center"
          onBlur={onBlur} 
        />

        {rightIcon ? (
          <Pressable
            onPress={onPressRightIcon}
            style={styles.rightIconBtn}
            accessibilityRole="button"
          >
            {rightIcon}
          </Pressable>
        ) : null}
      </View>

      {!!error && (
        <AppText variant="error" style={styles.error}>
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 14 },
  label: { marginBottom: 8 },

  inputWrap: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: 14,
    paddingRight: 14,
    justifyContent: 'center',
    position: 'relative',
  },

  inputWrapError: { borderColor: colors.danger },

  input: {
    height: 52,
    padding: 0,
    color: colors.text,
    fontSize: typography.size.md,
    fontFamily: typography.family.regular,
  },

  inputWithRightPadding: {
    paddingRight: 44,
  },

  rightIconBtn: {
    position: 'absolute',
    right: 6,
    height: 52,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  error: { marginTop: 6 },
});
