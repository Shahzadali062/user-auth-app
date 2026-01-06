import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

import Screen from '../Screen';
import AppInput from '../../ui/components/AppInput';
import AppButton from '../../ui/components/AppButton';
import Icon from '../../ui/components/Icon';
import AppText from '../../ui/components/AppText';

import { useAuth } from '../../auth/AuthContext';
import { validateSignup } from '../../ui/utils/validators';
import { styles } from './styles';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const { signup, isSubmitting } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

 
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; password?: boolean }>(
    {}
  );

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

  const errors = useMemo(() => validateSignup(name, email, password), [name, email, password]);

  const clearFormErrorIfAny = () => {
    if (formError) setFormError('');
  };

  const onSubmit = async () => {
    clearFormErrorIfAny();

    
    if (errors.name) {
      setTouched({ name: true });
      return;
    }

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
      await signup(name, email, password);
    } catch (e: any) {
      setFormError(e?.message ?? 'Signup failed. Please try again.');
    }
  };

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
            <View style={styles.glow1} />
            <View style={styles.glow2} />

            <View style={styles.container}>
              <View style={styles.brandRow}>
                <View style={styles.brandIcon}>
                  <Icon name="cloud" size={22} />
                </View>
                <AppText style={styles.brandTitle}>Kloudius</AppText>
              </View>

              <AppText style={styles.headline}>Create account</AppText>
              <AppText style={styles.subHeadline}>Sign up to get started</AppText>

              <View style={styles.card}>
                {formError ? <AppText style={styles.formError}>{formError}</AppText> : null}

                {/* Name */}
                <View style={styles.inputWithIcon}>
                  <View style={styles.leftIcon}>
                    <Icon name="person" size={18} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <AppInput
                      label="Name"
                      value={name}
                      onChangeText={(t) => {
                        setName(t);
                        clearFormErrorIfAny();
                        
                        if (touched.name) setTouched({});
                      }}
                      placeholder="Your name"
                      autoCapitalize="words"
                      error={touched.name ? errors.name : undefined}
                    />
                  </View>
                </View>

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

                
                <AppButton title="Signup" onPress={onSubmit} loading={isSubmitting} />

                <AppText style={styles.linkText} onPress={() => navigation.navigate('Login')}>
                  Already have an account? <AppText style={styles.link}>Go to Login</AppText>
                </AppText>
              </View>

              <AppText style={styles.footerHint}>Tip: Password must be at least 6 characters.</AppText>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
