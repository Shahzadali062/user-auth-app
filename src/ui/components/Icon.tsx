import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Icon({
  name,
  size = 20,
  color = 'white',
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return <MaterialIcons name={name} size={size} color={color} />;
}
