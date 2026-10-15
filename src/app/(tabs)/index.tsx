import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Flame, Zap, Footprints, Dumbbell, Utensils, ChevronRight, User, Calendar, Trophy, Droplets, Moon, Bot } from 'lucide-react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';
import { ProgressBar } from '@/components/common/ProgressBar';

/**
 * MOCK LOGIC & STATE
 */
const MOCK_USER = { name: 'Abdulbosit' };

export default function HomeScreen() {
  const [stats, setStats] = useState({
    calories: { current: 1240, goal: 2000 },
    activity: { current: 7842, goal: 10000 },
    steps: { current: 8432, goal: 12000 },
  });

  const [workoutRecommendation, setWorkoutRecommendation] = useState({
    name: 'Верхняя часть тела',
    duration: '19:00 - 45 мин',
    label: 'Сегодня',
  });

  const [nutritionRemaining, setNutritionRemaining] = useState({
    recommended: 2350,
    remaining: 1110,
  });

  const todayGoalPercent = 0.72; // 72%

  useEffect(() => {
    // TODO: fetchHomeDashboardData() here
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground
        // ВНИМАНИЕ: Замените на require('@/assets/images/wallpapers/mainTabWallpaper.png')
        // когда добавите файл в папку! Пока что грузим заглушку из интернета, чтобы избежать ошибки.
        source={require('@/assets/images/wallpapers/mainTabWallpaper.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ExpoLinearGradient
          colors={['rgba(18, 20, 42, 0.1)', 'rgba(18, 20, 42, 0.95)', '#12142A']}
          locations={[0, 0.8, 1]}
          style={styles.gradientOverlay}
        />
        
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Header Section */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greetText}>Привет, {MOCK_USER.name}! 👋</Text>
              <Text style={styles.greetSub}>Сегодня отличный день!</Text>
            </View>
            <View style={styles.avatarContainer}>
              <User size={24} color={Colors.textPrimary} />
            </View>
          </View>

          {/* Main Circular Progress */}
          <View style={styles.circularProgressContainer}>
            <CircularProgress percent={todayGoalPercent} />
          </View>

          {/* Quick Links Horizontal Scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickLinksRow}>
            {[
              { icon: Bot, name: 'AI Коуч', route: '/(tabs)/ai-coach', color: Colors.accentGreen },
              { icon: Droplets, name: 'Вода', route: '/(tabs)/recovery/water', color: '#38BDF8' },
              { icon: Moon, name: 'Сон', route: '/(tabs)/recovery/sleep', color: '#8B5CF6' },
              { icon: Calendar, name: 'Календарь', route: '/(tabs)/calendar', color: Colors.textPrimary },
              { icon: Trophy, name: 'Награды', route: '/(tabs)/achievements', color: '#F59E0B' },
            ].map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.quickLinkItem} onPress={() => router.push(item.route as any)} activeOpacity={0.8}>
                <View style={[styles.quickLinkIcon, { backgroundColor: item.color + '20' }]}>
                  <item.icon size={22} color={item.color} />
                </View>
                <Text style={styles.quickLinkText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <TouchableOpacity style={[styles.glassCard, { flex: 1, marginRight: Spacing.sm }]} onPress={() => router.push('/(tabs)/activity')} activeOpacity={0.8}>
                <View style={styles.statHeader}>
                  <Flame size={20} color="#D8B4E2" />
                  <Text style={styles.statLabel}>Калории</Text>
                </View>
                <Text style={styles.statValue}>
                  {stats.calories.current.toLocaleString()} <Text style={styles.statTotal}>/ {stats.calories.goal.toLocaleString()}</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.glassCard, { flex: 1, marginLeft: Spacing.sm }]} onPress={() => router.push('/(tabs)/activity')} activeOpacity={0.8}>
                <View style={styles.statHeader}>
                  <Zap size={20} color={Colors.accentGreen} />
                  <Text style={styles.statLabel}>Активность</Text>
                </View>
                <Text style={styles.statValue}>
                  {stats.activity.current.toLocaleString()} <Text style={styles.statTotal}>/ {stats.activity.goal.toLocaleString()}</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.glassCard} onPress={() => router.push('/(tabs)/activity')} activeOpacity={0.8}>
              <View style={styles.statHeader}>
                <Footprints size={20} color="#A3C4D1" />
                <Text style={styles.statLabel}>Шаги</Text>
              </View>
              <Text style={styles.statValue}>
                {stats.steps.current.toLocaleString()} <Text style={styles.statTotal}>/ {stats.steps.goal.toLocaleString()}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Cards */}
          <TouchableOpacity
            style={styles.glassCardRow}
            onPress={() => router.push('/(tabs)/workouts')}
            activeOpacity={0.8}
          >
            <View style={styles.iconBoxGreen}>
              <Dumbbell size={24} color={Colors.accentGreen} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Тренировка</Text>
              <Text style={styles.actionName}>{workoutRecommendation.name}</Text>
              <Text style={styles.actionSub}>{workoutRecommendation.label}, {workoutRecommendation.duration}</Text>
            </View>
            <ChevronRight size={24} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.glassCardRow}
            onPress={() => router.push('/(tabs)/nutrition')}
            activeOpacity={0.8}
          >
            <View style={styles.iconBoxYellow}>
              <Utensils size={24} color={Colors.accentYellow} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Питание</Text>
              <Text style={styles.actionName}>Рекомендуется: {nutritionRemaining.recommended.toLocaleString()} ккал</Text>
              <Text style={styles.actionSub}>Осталось: {nutritionRemaining.remaining.toLocaleString()} ккал</Text>
            </View>
            <ChevronRight size={24} color={Colors.textMuted} />
          </TouchableOpacity>


        </ScrollView>
      </ImageBackground>
    </View>
  );
}

// ─── Circular Progress SubComponent
function CircularProgress({ percent }: { percent: number }) {
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={Colors.accentGreen} stopOpacity="1" />
            <Stop offset="1" stopColor="#00E676" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* Background Circle */}
        <Circle
          stroke="rgba(255, 255, 255, 0.15)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Foreground Circle */}
        <Circle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.circularLabelContainer]}>
        <Text style={styles.circularPercent}>{Math.round(percent * 100)}%</Text>
        <Text style={styles.circularSubText}>Цель на сегодня</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  background: { flex: 1 },
  gradientOverlay: {
    ...StyleSheet.absoluteFill as any,
  },
  content: { padding: Spacing.base, paddingTop: 60, paddingBottom: 100, gap: Spacing.lg },
  
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greetText: { color: Colors.textPrimary, fontSize: 24, fontWeight: Typography.fontWeight.bold },
  greetSub: { color: 'rgba(255,255,255,0.7)', fontSize: Typography.fontSize.sm, marginTop: 4 },
  avatarContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  
  circularProgressContainer: { alignItems: 'center', marginVertical: Spacing.md },
  circularLabelContainer: { position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  circularPercent: { color: Colors.textPrimary, fontSize: 44, fontWeight: Typography.fontWeight.bold },
  circularSubText: { color: 'rgba(255, 255, 255, 0.7)', fontSize: Typography.fontSize.xs, marginTop: 4 },
  
  quickLinksRow: { gap: Spacing.md, paddingVertical: Spacing.sm },
  quickLinkItem: { alignItems: 'center', gap: 6, width: 72 },
  quickLinkIcon: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  quickLinkText: { color: 'rgba(255,255,255,0.8)', fontSize: 11, textAlign: 'center' },

  statsGrid: { gap: Spacing.sm },
  statsRow: { flexDirection: 'row' },
  glassCard: {
    backgroundColor: 'rgba(20, 25, 45, 0.65)',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  statLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: Typography.fontSize.sm, marginLeft: Spacing.xs },
  statValue: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  statTotal: { color: 'rgba(255, 255, 255, 0.5)', fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.regular },
  
  glassCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 25, 45, 0.75)',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionContent: { flex: 1, marginLeft: Spacing.md },
  actionTitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: Typography.fontSize.xs, marginBottom: 2 },
  actionName: { color: Colors.textPrimary, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semiBold },
  actionSub: { color: 'rgba(255, 255, 255, 0.5)', fontSize: Typography.fontSize.xs, marginTop: 2 },
  
  iconBoxGreen: { width: 48, height: 48, borderRadius: Radius.md, backgroundColor: 'rgba(0, 230, 118, 0.15)', alignItems: 'center', justifyContent: 'center' },
  iconBoxYellow: { width: 48, height: 48, borderRadius: Radius.md, backgroundColor: 'rgba(255, 214, 0, 0.15)', alignItems: 'center', justifyContent: 'center' },
});
