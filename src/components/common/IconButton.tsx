import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Radius, Spacing } from '@/constants/spacing';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

export function IconButton({
  icon,
  onPress,
  size = 40,
  backgroundColor = Colors.backgroundElevated,
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
