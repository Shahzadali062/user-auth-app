import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';

import Screen from '../Screen';
import AppInput from '../../ui/components/AppInput';
import AppButton from '../../ui/components/AppButton';
import Icon from '../../ui/components/Icon';
import { useAuth } from '../../auth/AuthContext';
import { validateLogin } from '../../ui/utils/validators';
import { styles } from './styles';
import AppText from '../../ui/components/AppText';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { login, isSubmitting } = useAuth();
  const { height } = useWindowDimensions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [formError, setFormError] = useState('');

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // Entrance animation
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  const errors = useMemo(() => validateLogin(email, password), [email, password]);

  const clearFormErrorIfAny = () => {
    if (formError) setFormError('');
  };

  const onSubmit = async () => {
    clearFormErrorIfAny();

    // validation
    if (errors.email) {
      setTouched({ email: true });
      return;
    }

    if (errors.password) {
      setTouched({ password: true });
      return;
    }

    setTouched({});
    try {
      await login(email, password);
    } catch (e: any) {
      setFormError(e?.message ?? 'Login failed. Please try again.');
    }
  };

  // responsive width 
  const cardMaxWidth = height > 750 ? 420 : 380;

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.scrollContent,
            styles.centerX,
            !keyboardOpen ? styles.centerWhenClosed : null,
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
        >
          <Animated.View style={[styles.wrap, { opacity: fade, transform: [{ translateY: slide }] }]}>
            {/* glow blobs */}
            <View style={styles.glow1} />
            <View style={styles.glow2} />

           
            <View style={styles.container}>
              
              <View style={styles.brandRow}>
                <View style={styles.brandIcon}>
                  <Icon name="cloud" size={22} />
                </View>
                <AppText style={styles.brandTitle}>Kloudius</AppText>
              </View>

              <AppText style={styles.subHeadline}>Login to continue</AppText>

              <View style={[styles.card, { maxWidth: cardMaxWidth }]}>
                {formError ? <AppText style={styles.formError}>{formError}</AppText> : null}

                {/* Email */}
                <View style={styles.inputWithIcon}>
                  <View style={styles.leftIcon}>
                    <Icon name="email" size={18} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <AppInput
                      label="Email"
                      value={email}
                      onChangeText={(t) => {
                        setEmail(t);
                        clearFormErrorIfAny();
                        if (touched.email) setTouched({});
                      }}
                      placeholder="you@example.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={touched.email ? errors.email : undefined}
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={styles.inputWithIcon}>
                  <View style={styles.leftIcon}>
                    <Icon name="lock" size={18} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <AppInput
                      label="Password"
                      value={password}
                      onChangeText={(t) => {
                        setPassword(t);
                        clearFormErrorIfAny();
                        if (touched.password) setTouched({});
                      }}
                      placeholder="••••••••"
                      secureTextEntry={!showPassword}
                      error={touched.password ? errors.password : undefined}
                      rightIcon={<Icon name={showPassword ? 'visibility-off' : 'visibility'} size={18} />}
                      onPressRightIcon={() => setShowPassword((s) => !s)}
                    />
                  </View>
                </View>

                
                <AppButton title="Login" onPress={onSubmit} loading={isSubmitting} />

                <AppText style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
                  Don’t have an account? <AppText style={styles.link}>Go to Signup</AppText>
                </AppText>
              </View>

             
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
