import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Radius, Spacing } from '@/constants/spacing';

type ButtonVariant = 'gradient' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'gradient',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
}: ButtonProps) {
  const containerStyle = [
    styles.base,
    styles[size],
    variant === 'outline' && styles.outline,
    variant === 'ghost' && styles.ghost,
    variant === 'gradient' && styles.gradient,
    (disabled || loading) && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textPrimary} size="small" />
      ) : (
        <>
          {leftIcon && leftIcon}
          <Text style={[styles.text, styles[`text_${size}` as keyof typeof styles], textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
    gap: Spacing.sm,
  },
  // Sizes
  sm: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    minHeight: 36,
  },
  md: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: 48,
  },
  lg: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xxl,
    minHeight: 56,
  },
  // Variants
  gradient: {
    backgroundColor: Colors.accentPurple,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.accentPurple,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  // Text
  text: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: 'center',
  },
  text_sm: {
    fontSize: Typography.fontSize.sm,
  },
  text_md: {
    fontSize: Typography.fontSize.md,
  },
  text_lg: {
    fontSize: Typography.fontSize.lg,
  },
});
