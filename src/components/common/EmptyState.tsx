import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  style?: ViewStyle;
}

export function EmptyState({ icon, title, description, style }: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  iconContainer: {
    marginBottom: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: 'center',
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    lineHeight: 22,
  },
});
