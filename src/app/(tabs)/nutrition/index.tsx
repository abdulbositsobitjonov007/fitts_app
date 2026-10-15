import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { router } from 'expo-router';
import { Search, Plus, ChevronRight, CheckCircle, XCircle } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';
import { ProgressBar } from '@/components/common/ProgressBar';

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
// TODO: Replace with API calls like:
//   GET /api/nutrition/summary?date=today
//   GET /api/nutrition/meals?date=today
//   GET /api/nutrition/recommendations

const MOCK_CALORIE_DATA = { consumed: 1240, goal: 2350 };

const MOCK_MACROS = [
  { label: 'Белки',    current: 98,  goal: 160, unit: 'г', color: '#3B82F6' },
  { label: 'Жиры',    current: 42,  goal: 70,  unit: 'г', color: '#F59E0B' },
  { label: 'Углеводы', current: 138, goal: 320, unit: 'г', color: '#10B981' },
];

const MOCK_MEALS = [
  {
    id: '1',
    name: 'Завтрак',
    calories: 480,
    rating: '8.0',
    emoji: '🍳',
    time: '08:00',
    items: ['Овсянка', 'Яйца', 'Кофе'],
  },
  {
    id: '2',
    name: 'Обед',
    calories: 620,
    rating: '7.5',
    emoji: '🥗',
    time: '13:30',
    items: ['Рис', 'Куриная грудка', 'Салат'],
  },
];

const MOCK_GOOD_FOODS = [
  { id: '1', name: 'Куриная грудка',    emoji: '🍗', benefit: 'Белок' },
  { id: '2', name: 'Овощи (брокколи, шпинат)', emoji: '🥦', benefit: 'Витамины' },
  { id: '3', name: 'Крупы (гречка, киноа)',  emoji: '🌾', benefit: 'Углеводы' },
  { id: '4', name: 'Яйца',             emoji: '🥚', benefit: 'Белок + Жиры' },
  { id: '5', name: 'Орехи и семена',   emoji: '🥜', benefit: 'Жиры' },
  { id: '6', name: 'Фрукты (ягоды, яблоки)', emoji: '🍓', benefit: 'Клетчатка' },
];

const MOCK_BAD_FOODS = [
  { id: '1', name: 'Фастфуд',          emoji: '🍔' },
  { id: '2', name: 'Сладости',          emoji: '🍬' },
  { id: '3', name: 'Газировка и соки',  emoji: '🥤' },
  { id: '4', name: 'Белый хлеб, выпечка', emoji: '🍞' },
  { id: '5', name: 'Алкоголь',          emoji: '🍷' },
];

// ─── CalorieRing SVG Component ───────────────────────────────────────────────
function CalorieRing({ consumed, goal }: { consumed: number; goal: number }) {
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = Math.min(consumed / goal, 1);
  const strokeDashoffset = circumference - pct * circumference;

  return (
    <View style={ringStyles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="calGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#8B5CF6" stopOpacity="1" />
            <Stop offset="1" stopColor="#3B82F6" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle
          stroke="rgba(255,255,255,0.1)"
          fill="none"
          cx={size / 2} cy={size / 2} r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="url(#calGrad)"
          fill="none"
          cx={size / 2} cy={size / 2} r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill as any, ringStyles.label]}>
        <Text style={ringStyles.value}>{consumed.toLocaleString()}</Text>
        <Text style={ringStyles.sub}>/{goal.toLocaleString()} ккал</Text>
      </View>
    </View>
  );
}

const ringStyles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  label: { alignItems: 'center', justifyContent: 'center' },
  value: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  sub: { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 },
});

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function NutritionScreen() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [recTab, setRecTab]   = useState<'good' | 'bad'>('good');
  const [calorieData, setCalorieData] = useState(MOCK_CALORIE_DATA);
  const [macros, setMacros] = useState(MOCK_MACROS);
  const [meals, setMeals] = useState(MOCK_MEALS);

  useEffect(() => {
    // TODO: fetch nutrition data for selected period
    // const data = await nutritionApi.getSummary(period);
    // setCalorieData(data.calories);
    // setMacros(data.macros);
    // setMeals(data.meals);
  }, [period]);

  const displayedFoods = recTab === 'good' ? MOCK_GOOD_FOODS : MOCK_BAD_FOODS;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Питание</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Search size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Period Tabs */}
        <View style={styles.periodTabs}>
          {(['today', 'week', 'month'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodTab, period === p && styles.periodTabActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.periodTabText, period === p && styles.periodTabTextActive]}>
                {p === 'today' ? 'Сегодня' : p === 'week' ? 'Неделя' : 'Месяц'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calorie Ring + Macros */}
        <View style={styles.summaryCard}>
          <CalorieRing consumed={calorieData.consumed} goal={calorieData.goal} />
          <View style={styles.macros}>
            {macros.map((m) => (
              <View key={m.label} style={styles.macroItem}>
                <View style={styles.macroHeader}>
                  <Text style={styles.macroLabel}>{m.label}</Text>
                  <Text style={styles.macroValue}>
                    {m.current} <Text style={styles.macroGoal}>/ {m.goal}{m.unit}</Text>
                  </Text>
                </View>
                <ProgressBar progress={m.current / m.goal} color={m.color} height={6} />
              </View>
            ))}
          </View>
        </View>

        {/* Meals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Приёмы пищи</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={18} color={Colors.accentPurple} />
            <Text style={styles.addButtonText}>Добавить</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {meals.map((meal) => (
            <TouchableOpacity key={meal.id} style={styles.mealRow} activeOpacity={0.8}
              onPress={() => {/* TODO: navigate to meal detail */}}>
              <View style={styles.mealIconBox}>
                <Text style={styles.mealEmoji}>{meal.emoji}</Text>
              </View>
              <View style={styles.flexInner}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.calories} ккал • {meal.time}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{meal.rating}</Text>
              </View>
              <ChevronRight size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>Рекомендации</Text>
        <View style={styles.recTabs}>
          {(['good', 'bad'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.recTab,
                recTab === t && (t === 'good' ? styles.recTabGood : styles.recTabBad),
              ]}
              onPress={() => setRecTab(t)}
            >
              {t === 'good'
                ? <CheckCircle size={14} color={recTab === 'good' ? '#FFF' : Colors.accentGreen} />
                : <XCircle size={14} color={recTab === 'bad' ? '#FFF' : Colors.accentOrange} />
              }
              <Text style={[styles.recTabText, recTab === t && styles.recTabTextActive]}>
                {t === 'good' ? 'Полезно' : 'Избегать'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Foods Section Header */}
        {recTab === 'good' && (
          <Text style={styles.recSectionLabel}>Рекомендуемые продукты</Text>
        )}
        {recTab === 'bad' && (
          <Text style={[styles.recSectionLabel, { color: Colors.accentOrange }]}>Лучше избегать</Text>
        )}

        <View style={styles.list}>
          {displayedFoods.map((item) => (
            <View key={item.id} style={[styles.recRow, recTab === 'bad' && styles.recRowBad]}>
              <View style={[styles.recIconBox, recTab === 'bad' && styles.recIconBoxBad]}>
                <Text style={styles.recEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.recName}>{item.name}</Text>
              {(item as any).benefit && (
                <Text style={styles.recBenefit}>{(item as any).benefit}</Text>
              )}
            </View>
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

  periodTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.full,
    padding: 4,
    alignSelf: 'flex-start',
  },
  periodTab: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: Radius.full },
  periodTabActive: { backgroundColor: Colors.accentPurple },
  periodTabText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
  periodTabTextActive: { color: '#FFF', fontWeight: Typography.fontWeight.semiBold },

  summaryCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  macros: { flex: 1, gap: Spacing.sm },
  macroItem: { gap: 4 },
  macroHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  macroLabel: { color: Colors.textSecondary, fontSize: Typography.fontSize.xs },
  macroValue: { color: Colors.textPrimary, fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.medium },
  macroGoal: { color: Colors.textMuted },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.sm },
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  addButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addButtonText: { color: Colors.accentPurple, fontSize: Typography.fontSize.sm },

  list: { gap: Spacing.sm },
  flexInner: { flex: 1 },

  mealRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.backgroundCard, borderRadius: Radius.md,
    padding: Spacing.md, gap: Spacing.md,
  },
  mealIconBox: {
    backgroundColor: Colors.backgroundElevated,
    width: 52, height: 52, borderRadius: Radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  mealEmoji: { fontSize: 28 },
  mealName: { color: Colors.textPrimary, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semiBold },
  mealTime: { color: Colors.textSecondary, fontSize: Typography.fontSize.xs, marginTop: 2 },
  ratingBadge: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm,
  },
  ratingText: { color: Colors.accentGreen, fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.bold },

  recTabs: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  recTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border,
  },
  recTabGood: { backgroundColor: Colors.accentGreen, borderColor: Colors.accentGreen },
  recTabBad:  { backgroundColor: Colors.accentOrange, borderColor: Colors.accentOrange },
  recTabText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
  recTabTextActive: { color: '#FFF', fontWeight: Typography.fontWeight.semiBold },

  recSectionLabel: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm, marginTop: 4 },

  recRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.backgroundCard, borderRadius: Radius.md,
    padding: Spacing.md, gap: Spacing.md,
  },
  recRowBad: { backgroundColor: 'rgba(251,146,60,0.08)', borderWidth: 1, borderColor: 'rgba(251,146,60,0.2)' },
  recIconBox: {
    width: 44, height: 44, borderRadius: Radius.sm,
    backgroundColor: Colors.backgroundElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  recIconBoxBad: { backgroundColor: 'rgba(239,68,68,0.15)' },
  recEmoji: { fontSize: 22 },
  recName: { flex: 1, color: Colors.textPrimary, fontSize: Typography.fontSize.base },
  recBenefit: { color: Colors.textSecondary, fontSize: Typography.fontSize.xs },
});
