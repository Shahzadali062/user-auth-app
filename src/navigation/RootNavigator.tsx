import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../auth/AuthContext';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UsersScreen from '../screens/Users/UsersScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Users: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, isBooting } = useAuth();

  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    setSplashDone(false);
  }, []);

  const showSplash = !splashDone || isBooting;

  if (showSplash) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Users" component={UsersScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
