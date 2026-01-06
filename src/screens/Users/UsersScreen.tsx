import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import Screen from '../Screen';
import AppText from '../../ui/components/AppText';
import Icon from '../../ui/components/Icon';
import { styles } from './styles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import type { StoredUser } from '../../auth/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Users'>;

const KEYS = {
  STORED_USERS: 'stored_users',
};

export default function UsersScreen({ navigation }: Props) {
  const [users, setUsers] = useState<StoredUser[]>([]);

  const loadUsers = useCallback(async () => {
    const raw = await AsyncStorage.getItem(KEYS.STORED_USERS);
    if (!raw) {
      setUsers([]);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as StoredUser[];
      setUsers(Array.isArray(parsed) ? parsed : []);
    } catch {
      setUsers([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.glow1} />
        <View style={styles.glow2} />

        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backBtn, pressed ? { opacity: 0.8 } : null]}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Icon name="arrow-back" size={20} />
            </Pressable>

            <View style={{ flex: 1 }}>
              <AppText style={styles.title}>Users</AppText>
              <AppText style={styles.subtitle}>All registered accounts</AppText>
            </View>

            <View style={{ width: 40 }} />
          </View>

          {/* List */}
          <View style={styles.card}>
            {users.length === 0 ? (
              <AppText style={styles.emptyText}>No users found. Create an account from Signup.</AppText>
            ) : (
              <FlatList
                data={users}
                keyExtractor={(item) => item.email}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                  <View style={styles.userRow}>
                    <View style={styles.userIcon}>
                      <Icon name="person" size={18} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <AppText style={styles.userName}>{item.name}</AppText>
                      <AppText style={styles.userMeta}>{item.email}</AppText>
                      {/* You asked to show password visible */}
                      <AppText style={styles.userMeta}>Password: {item.password}</AppText>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
    </Screen>
  );
}
