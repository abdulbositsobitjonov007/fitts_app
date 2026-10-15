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
import { MapPin, Flame, PersonStanding, Timer } from 'lucide-react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: Replace with API: GET /api/activity/summary?date=2024-10-21
const MOCK_ACTIVITY = {
  steps: 8432,
  stepsGoal: 12000,
  distance: 5.8,
  calories: 632,
  activeMinutes: 47,
};

// Steps per 2-hour blocks from 6am → midnight
const DAY_CHART_DATA = [
  { value: 200, label: '06', frontColor: Colors.backgroundElevated },
  { value: 350, label: '08', frontColor: Colors.backgroundElevated },
  { value: 150, label: '10', frontColor: Colors.backgroundElevated },
  { value: 600, label: '12', frontColor: Colors.accentPurple },
  { value: 800, label: '14', frontColor: Colors.backgroundElevated },
  { value: 950, label: '16', frontColor: Colors.backgroundElevated },
  { value: 720, label: '18', frontColor: Colors.backgroundElevated },
  { value: 450, label: '20', frontColor: Colors.backgroundElevated },
];

// SVG Step Ring
function StepsRing({ steps, goal }: { steps: number; goal: number }) {
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = Math.min(steps / goal, 1);
  const strokeDashoffset = circumference - pct * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="stepsGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#10B981" stopOpacity="1" />
            <Stop offset="1" stopColor="#34D399" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle stroke="rgba(255,255,255,0.1)" fill="none"
          cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <Circle stroke="url(#stepsGrad)" fill="none"
          cx={size / 2} cy={size / 2} r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill as any, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={ringStyles.value}>{steps.toLocaleString()}</Text>
        <Text style={ringStyles.label}>шагов</Text>
        <Text style={ringStyles.goal}>из {goal.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const ringStyles = StyleSheet.create({
  value: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },
  goal: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
});

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function ActivityScreen() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [activity, setActivity] = useState(MOCK_ACTIVITY);

  useEffect(() => {
    // TODO: fetch activity data for selected period
    // const data = await activityApi.getSummary(period);
    // setActivity(data);
  }, [period]);

  const maxBar = Math.max(...DAY_CHART_DATA.map((d) => d.value));

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Активность</Text>

        {/* Period Tabs */}
        <View style={styles.tabs}>
          {(['day', 'week', 'month'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.tab, period === p && styles.tabActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.tabText, period === p && styles.tabTextActive]}>
                {p === 'day' ? 'День' : p === 'week' ? 'Неделя' : 'Месяц'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Steps Ring Card */}
        <View style={styles.stepsCard}>
          <StepsRing steps={activity.steps} goal={activity.stepsGoal} />

          {/* Stats Row */}
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(96,165,250,0.15)' }]}>
                <MapPin size={18} color="#60A5FA" />
              </View>
              <Text style={styles.statValue}>{activity.distance} км</Text>
              <Text style={styles.statLabel}>Расстояние</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(251,146,60,0.15)' }]}>
                <Flame size={18} color="#FB923C" />
              </View>
              <Text style={styles.statValue}>{activity.calories}</Text>
              <Text style={styles.statLabel}>Калории</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(167,139,250,0.15)' }]}>
                <Timer size={18} color="#A78BFA" />
              </View>
              <Text style={styles.statValue}>{activity.activeMinutes} мин</Text>
              <Text style={styles.statLabel}>Активность</Text>
            </View>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Шаги по часам</Text>
          <BarChart
            data={DAY_CHART_DATA}
            barWidth={18}
            spacing={12}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: Colors.textMuted, fontSize: 10 }}
            xAxisLabelTextStyle={{ color: Colors.textMuted, fontSize: 10, textAlign: 'center' }}
            noOfSections={3}
            maxValue={Math.ceil(maxBar * 1.2)}
            height={160}
            initialSpacing={10}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: 56, paddingBottom: 100, gap: Spacing.md },
  screenTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },

  tabs: { flexDirection: 'row', backgroundColor: Colors.backgroundCard, borderRadius: Radius.full, padding: 4, alignSelf: 'flex-start' },
  tab: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: Radius.full },
  tabActive: { backgroundColor: Colors.accentPurple },
  tabText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
  tabTextActive: { color: '#FFF', fontWeight: Typography.fontWeight.semiBold },

  stepsCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center', gap: Spacing.base },

  statRow: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingTop: Spacing.sm },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: Colors.border },
  statIcon: { width: 36, height: 36, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center' },
  statValue: { color: Colors.textPrimary, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.bold, marginTop: 4 },
  statLabel: { color: Colors.textSecondary, fontSize: Typography.fontSize.xs },

  chartCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, paddingBottom: Spacing.md },
  chartTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semiBold, marginBottom: Spacing.md },
});
