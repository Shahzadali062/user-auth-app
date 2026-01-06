import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import Screen from '../Screen';
import AppText from '../../ui/components/AppText';
import { styles } from './styles';

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacity, {
        toValue: 0.15,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]);

    anim.start();

    const t = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(t);
      anim.stop();
    };
  }, [onFinish, opacity, scale]);

  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.glow1} />
        <View style={styles.glow2} />

        <Animated.View style={{ opacity, transform: [{ scale }] }}>
          <AppText style={styles.title}>Kloudius</AppText>
        </Animated.View>
      </View>
    </Screen>
  );
}
