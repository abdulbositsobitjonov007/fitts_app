import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/spacing';
import { Typography } from '@/constants/typography';

interface ProgressBarProps {
  progress: number; // 0–1
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  color = Colors.accentPurple,
  backgroundColor = Colors.backgroundElevated,
  height = 8,
  showLabel = false,
  label,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View style={style}>
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showLabel && (
            <Text style={styles.percent}>{Math.round(clampedProgress * 100)}%</Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height, backgroundColor, borderRadius: Radius.full }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress * 100}%`,
              height,
              backgroundColor: color,
              borderRadius: Radius.full,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {},
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  percent: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
});
