import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function AppButton({
  title,
  onPress,
  loading,
  disabled,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean; 
}) {
  const isLoading = !!loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading} 
      style={({ pressed }) => [
        styles.btn,
        disabled ? styles.disabled : null, 
        pressed && !isLoading ? { opacity: 0.9 } : null,
      ]}
    >
      <View style={styles.inner}>
        {isLoading ? <ActivityIndicator /> : <Text style={styles.text}>{title}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  inner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: typography.family.semibold,
  },
  disabled: {
    opacity: 0.6,
  },
});
