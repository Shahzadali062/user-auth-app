import React from 'react';
import { Pressable, View } from 'react-native';

import Screen from '../Screen';
import AppText from '../../ui/components/AppText';
import AppButton from '../../ui/components/AppButton';
import Icon from '../../ui/components/Icon';
import { useAuth } from '../../auth/AuthContext';
import { styles } from './styles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { user, logout, isSubmitting } = useAuth();

  const displayName = user?.name?.trim() || 'User';
  const displayEmail = user?.email?.trim() || '—';

  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.glow1} />
        <View style={styles.glow2} />

        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.brandIcon}>
              <Icon name="cloud" size={22} />
            </View>

            <View style={{ flex: 1 }}>
              <AppText style={styles.title}>Home</AppText>
              <AppText style={styles.subtitle}>You are logged in</AppText>
            </View>

            {/* Top-right users icon */}
            <Pressable
              onPress={() => navigation.navigate('Users')}
              style={({ pressed }) => [styles.usersBtn, pressed ? { opacity: 0.8 } : null]}
              accessibilityRole="button"
              accessibilityLabel="Open users list"
            >
              <Icon name="groups" size={22} />
            </Pressable>
          </View>

          <View style={styles.card}>
            <AppText style={styles.cardLabel}>Name</AppText>
            <AppText style={styles.cardValue}>{displayName}</AppText>

            <View style={styles.divider} />

            <AppText style={styles.cardLabel}>Email</AppText>
            <AppText style={styles.cardValue}>{displayEmail}</AppText>

            <View style={{ height: 16 }} />

            <AppButton title="Logout" onPress={logout} loading={isSubmitting} />
          </View>
        </View>
      </View>
    </Screen>
  );
}
