import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import {
  Scale,
  Dumbbell,
  Zap,
  Bike,
  Heart,
  CheckCircle,
  ChevronLeft,
} from 'lucide-react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// Each goal has a Lucide icon, accent color and background tint
const goals = [
  { id: 'lose_weight', Icon: Scale,    color: '#A78BFA', bg: 'rgba(167,139,250,0.15)', label: 'Похудение' },
  { id: 'gain_mass',   Icon: Dumbbell, color: '#FB923C', bg: 'rgba(251,146,60,0.15)',  label: 'Набор массы' },
  { id: 'maintain',    Icon: Zap,      color: '#34D399', bg: 'rgba(52,211,153,0.15)',  label: 'Поддержание формы' },
  { id: 'endurance',   Icon: Bike,     color: '#60A5FA', bg: 'rgba(96,165,250,0.15)',  label: 'Улучшение выносливости' },
  { id: 'health',      Icon: Heart,    color: '#F472B6', bg: 'rgba(244,114,182,0.15)', label: 'Здоровье и энергия' },
];

export default function GoalSelectionScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string>('maintain');

  function goNext() {
    // TODO: save selectedGoal to global store / AsyncStorage before navigating
    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Выбери свою цель</Text>
        <Text style={styles.subtitle}>Это поможет нам подобрать нужную программу</Text>

        {/* Goal list */}
        <View style={styles.goalList}>
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            const { Icon } = goal;
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalItem, isSelected && styles.goalItemSelected]}
                onPress={() => setSelectedGoal(goal.id)}
                activeOpacity={0.8}
              >
                {/* Colored icon box */}
                <View style={[styles.iconBox, { backgroundColor: goal.bg }]}>
                  <Icon size={22} color={goal.color} />
                </View>

                <Text style={[styles.goalLabel, isSelected && styles.goalLabelSelected]}>
                  {goal.label}
                </Text>

                {/* CheckCircle icon when selected */}
                {isSelected && (
                  <CheckCircle size={22} color={Colors.accentPurple} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Gradient CTA button */}
        <TouchableOpacity style={styles.buttonWrapper} onPress={goNext} activeOpacity={0.85}>
          <ExpoLinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Далее →</Text>
          </ExpoLinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.huge,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.base,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  goalList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.md,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: Spacing.md,
  },
  goalItemSelected: {
    borderColor: Colors.accentPurple,
    backgroundColor: Colors.backgroundElevated,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalLabel: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
  },
  goalLabelSelected: {
    color: Colors.textPrimary,
  },
  buttonWrapper: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
