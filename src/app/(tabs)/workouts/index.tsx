import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Dumbbell, Activity, Play, Clock, Flame, ChevronRight, Search, Filter } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: GET /api/workouts/program/active  →  current user program
// TODO: GET /api/workouts/today           →  today's workouts
// TODO: GET /api/workouts?category=all    →  all available workouts

const MOCK_PROGRAM = {
  title: 'Программа: Сила + Кардио',
  subtitle: '3 тренировки в неделю • 6 недель',
  progress: 0.4, // 40% complete
  tags: ['Сила', 'Выносливость', 'Гибкость'],
  weekDay: 3, // Current week
  totalWeeks: 6,
};

type Workout = {
  id: string;
  title: string;
  duration: string;
  level: string;
  calories: number;
  category: 'strength' | 'cardio' | 'flexibility';
  iconColor: string;
  bgColor: string;
  completed?: boolean;
};

const MOCK_TODAY: Workout[] = [
  { id: '1', title: 'Верхняя часть тела', duration: '45 мин', level: 'Средний', calories: 320, category: 'strength', iconColor: '#A78BFA', bgColor: 'rgba(167,139,250,0.15)', completed: false },
  { id: '2', title: 'Нижняя часть тела', duration: '40 мин', level: 'Средний', calories: 280, category: 'strength', iconColor: '#60A5FA', bgColor: 'rgba(96,165,250,0.15)', completed: false },
];

const MOCK_ALL: Workout[] = [
  { id: '3', title: 'Кардио на улице',  duration: '50 мин', level: '10+ км',   calories: 450, category: 'cardio',     iconColor: '#FB923C', bgColor: 'rgba(251,146,60,0.15)' },
  { id: '4', title: 'HIIT тренировка', duration: '30 мин', level: 'Высокий',  calories: 400, category: 'cardio',     iconColor: '#F472B6', bgColor: 'rgba(244,114,182,0.15)' },
  { id: '5', title: 'Растяжка и йога', duration: '35 мин', level: 'Лёгкий',   calories: 120, category: 'flexibility', iconColor: '#34D399', bgColor: 'rgba(52,211,153,0.15)' },
  { id: '6', title: 'Жим лёжа',        duration: '55 мин', level: 'Средний',  calories: 300, category: 'strength',   iconColor: '#A78BFA', bgColor: 'rgba(167,139,250,0.15)' },
];

const CATEGORY_ICONS = {
  strength: Dumbbell,
  cardio: Activity,
  flexibility: Activity,
};

function WorkoutCard({ item, onPress }: { item: Workout; onPress: () => void }) {
  const Icon = CATEGORY_ICONS[item.category];
  return (
    <TouchableOpacity style={styles.workoutCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.workoutIcon, { backgroundColor: item.bgColor }]}>
        <Icon size={22} color={item.iconColor} />
      </View>
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <View style={styles.workoutMeta}>
          <Clock size={12} color={Colors.textMuted} />
          <Text style={styles.workoutMetaText}>{item.duration}</Text>
          <Flame size={12} color={Colors.textMuted} />
          <Text style={styles.workoutMetaText}>{item.calories} ккал</Text>
        </View>
        <Text style={styles.workoutLevel}>{item.level}</Text>
      </View>
      {item.completed != null && (
        <View style={[styles.statusDot, { backgroundColor: item.completed ? Colors.accentGreen : Colors.border }]} />
      )}
      <ChevronRight size={18} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

export default function WorkoutsScreen() {
  const [tab, setTab] = useState<'recommended' | 'all'>('recommended');
  const [todayWorkouts, setTodayWorkouts] = useState(MOCK_TODAY);

  useEffect(() => {
    // TODO: fetch today's workouts
    // const data = await workoutsApi.getToday();
    // setTodayWorkouts(data);
  }, []);

  const displayedAll = MOCK_ALL;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Тренировки</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Search size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['recommended', 'all'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.tabActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === 'recommended' ? 'Рекомендуемые' : 'Все'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Program card */}
        <TouchableOpacity activeOpacity={0.9} style={styles.programCard} onPress={() => {}}>
          <ExpoLinearGradient colors={['#4C1D95', '#1E40AF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
          <Text style={styles.programTitle}>{MOCK_PROGRAM.title}</Text>
          <Text style={styles.programSub}>{MOCK_PROGRAM.subtitle}</Text>
          
          {/* Progress bar */}
          <View style={styles.programProgressBg}>
            <View style={[styles.programProgressFill, { width: `${MOCK_PROGRAM.progress * 100}%` }]} />
          </View>
          <Text style={styles.programProgressLabel}>
            Неделя {MOCK_PROGRAM.weekDay} из {MOCK_PROGRAM.totalWeeks} • {Math.round(MOCK_PROGRAM.progress * 100)}% выполнено
          </Text>

          <View style={styles.tags}>
            {MOCK_PROGRAM.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/(tabs)/workouts/1' as any)} activeOpacity={0.85}>
            <Play size={16} color="#FFF" fill="#FFF" />
            <Text style={styles.startBtnText}>Начать тренировку</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Today section */}
        {tab === 'recommended' && (
          <>
            <Text style={styles.sectionTitle}>Сегодня</Text>
            <View style={styles.list}>
              {todayWorkouts.map((w) => (
                <WorkoutCard key={w.id} item={w} onPress={() => router.push(`/(tabs)/workouts/${w.id}` as any)} />
              ))}
            </View>
          </>
        )}

        {/* All workouts */}
        <Text style={styles.sectionTitle}>{tab === 'recommended' ? 'Другие тренировки' : 'Все тренировки'}</Text>
        <View style={styles.list}>
          {displayedAll.map((w) => (
            <WorkoutCard key={w.id} item={w} onPress={() => router.push(`/(tabs)/workouts/${w.id}` as any)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: 56, paddingBottom: 100, gap: Spacing.md },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  screenTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },
  headerIcon: { padding: 8 },

  tabs: { flexDirection: 'row', backgroundColor: Colors.backgroundCard, borderRadius: Radius.full, padding: 4, alignSelf: 'flex-start' },
  tab: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: Radius.full },
  tabActive: { backgroundColor: Colors.accentPurple },
  tabText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
  tabTextActive: { color: '#FFF', fontWeight: Typography.fontWeight.semiBold },

  programCard: { borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.sm, overflow: 'hidden', minHeight: 160 },
  programTitle: { color: '#FFF', fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold },
  programSub: { color: 'rgba(255,255,255,0.7)', fontSize: Typography.fontSize.sm },
  programProgressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' },
  programProgressFill: { height: '100%', backgroundColor: '#FFF', borderRadius: 3 },
  programProgressLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  tags: { flexDirection: 'row', gap: Spacing.sm },
  tag: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { color: '#FFF', fontSize: Typography.fontSize.xs },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.full, paddingVertical: 12, marginTop: 4 },
  startBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: Typography.fontSize.md },

  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  list: { gap: Spacing.sm },

  workoutCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.backgroundCard, borderRadius: Radius.md, padding: Spacing.md, gap: Spacing.md },
  workoutIcon: { width: 50, height: 50, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  workoutInfo: { flex: 1, gap: 3 },
  workoutTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semiBold },
  workoutMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  workoutMetaText: { color: Colors.textMuted, fontSize: 11 },
  workoutLevel: { color: Colors.textSecondary, fontSize: 11 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
});
