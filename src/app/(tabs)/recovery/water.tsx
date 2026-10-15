import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Alert,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Droplets, Plus, Minus, RotateCcw } from 'lucide-react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: GET /api/recovery/water/today  →  { consumed, goal }
// TODO: POST /api/recovery/water/add   →  { ml }
const GOAL_ML = 2600;
const INITIAL_ML = 1200;
const QUICK_AMOUNTS = [150, 250, 500];

const HISTORY = [
  { value: 2600, label: 'Пн', frontColor: Colors.accentBlue },
  { value: 1800, label: 'Вт', frontColor: Colors.backgroundElevated },
  { value: 2200, label: 'Ср', frontColor: Colors.backgroundElevated },
  { value: 2600, label: 'Чт', frontColor: Colors.accentBlue },
  { value: 1500, label: 'Пт', frontColor: Colors.backgroundElevated },
  { value: 2400, label: 'Сб', frontColor: Colors.backgroundElevated },
  { value: 1200, label: 'Вс', frontColor: Colors.accentPurple },
];

// SVG Water Ring
function WaterRing({ consumed, goal }: { consumed: number; goal: number }) {
  const size = 200;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = Math.min(consumed / goal, 1);
  const offset = circumference - pct * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#38BDF8" stopOpacity="1" />
            <Stop offset="1" stopColor="#0284C7" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle stroke="rgba(255,255,255,0.08)" fill="none"
          cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <Circle stroke="url(#waterGrad)" fill="none"
          cx={size / 2} cy={size / 2} r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill as any, { alignItems: 'center', justifyContent: 'center' }]}>
        <Droplets size={28} color="#38BDF8" />
        <Text style={ring.value}>{(consumed / 1000).toFixed(2)} л</Text>
        <Text style={ring.goal}>из {(goal / 1000).toFixed(1)} л</Text>
        <Text style={ring.pct}>{Math.round(pct * 100)}%</Text>
      </View>
    </View>
  );
}
const ring = StyleSheet.create({
  value: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginTop: 4 },
  goal: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  pct: { color: '#38BDF8', fontSize: 14, fontWeight: 'bold', marginTop: 2 },
});

export default function WaterScreen() {
  const [consumed, setConsumed] = useState(INITIAL_ML);
  const maxHistory = Math.max(...HISTORY.map((h) => h.value));

  function add(ml: number) {
    setConsumed((prev) => {
      const next = Math.min(prev + ml, GOAL_ML);
      // TODO: POST /api/recovery/water/add { ml, timestamp: new Date() }
      return next;
    });
  }

  function remove(ml: number) {
    setConsumed((prev) => Math.max(prev - ml, 0));
  }

  function reset() {
    Alert.alert('Сбросить воду?', 'Вы уверены, что хотите сбросить потребление воды до 0?', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Сбросить', style: 'destructive', onPress: () => setConsumed(0) },
    ]);
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Вода</Text>
          <TouchableOpacity onPress={reset} style={styles.resetBtn}>
            <RotateCcw size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Ring */}
        <View style={styles.ringCard}>
          <WaterRing consumed={consumed} goal={GOAL_ML} />
        </View>

        {/* Quick Add */}
        <Text style={styles.sectionTitle}>Добавить</Text>
        <View style={styles.quickRow}>
          {QUICK_AMOUNTS.map((ml) => (
            <TouchableOpacity key={ml} style={styles.addBtn} onPress={() => add(ml)} activeOpacity={0.8}>
              <Plus size={14} color="#FFF" />
              <Text style={styles.addBtnText}>{ml} мл</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Remove */}
        <View style={styles.quickRow}>
          {QUICK_AMOUNTS.map((ml) => (
            <TouchableOpacity key={ml} style={styles.removeBtn} onPress={() => remove(ml)} activeOpacity={0.8}>
              <Minus size={14} color="#38BDF8" />
              <Text style={styles.removeBtnText}>{ml} мл</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weekly History Chart */}
        <Text style={styles.sectionTitle}>История за неделю</Text>
        <View style={styles.chartCard}>
          <BarChart
            data={HISTORY}
            barWidth={26}
            spacing={18}
            roundedTop roundedBottom
            hideRules
            xAxisThickness={0} yAxisThickness={0}
            yAxisTextStyle={{ color: Colors.textMuted, fontSize: 10 }}
            xAxisLabelTextStyle={{ color: Colors.textMuted, fontSize: 10, textAlign: 'center' }}
            noOfSections={3}
            maxValue={Math.ceil(maxHistory * 1.2)}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },
  resetBtn: { padding: 8 },
  ringCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center' },
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  quickRow: { flexDirection: 'row', gap: Spacing.sm },
  addBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: '#38BDF8', borderRadius: Radius.md, paddingVertical: 12 },
  addBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: Typography.fontSize.sm },
  removeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, borderWidth: 1.5, borderColor: '#38BDF8', borderRadius: Radius.md, paddingVertical: 12 },
  removeBtnText: { color: '#38BDF8', fontWeight: 'bold', fontSize: Typography.fontSize.sm },
  chartCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, paddingTop: Spacing.lg },
});
