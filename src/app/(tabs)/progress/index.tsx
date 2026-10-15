import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

/**
 * MOCK LOGIC & STATE
 * Replace with real database API calls.
 */
const MOCK_WEIGHT_DATA = {
  current: 74.2,
  change: -1.4,
  unit: 'кг',
  history: [76, 75.5, 75.2, 74.8, 74.5, 74.2],
};

const MOCK_BODY_COMP = [
  { label: 'Жир', value: '14.6%' },
  { label: 'Мышечная масса', value: '56.3 кг' },
  { label: 'Вода', value: '60.2%' },
];

export default function ProgressScreen() {
  const [tab, setTab] = useState<'weight' | 'measurements' | 'photos'>('weight');
  // Used to show how state would be set initially
  const [weightState, setWeightState] = useState(MOCK_WEIGHT_DATA);

  // Map history to gifted-charts line data format
  const lineData = weightState.history.map((val) => ({
    value: val - 70, // offset for visual clarity (start axis higher than 0)
    dataPointText: val.toString(),
  }));
  
  const minVal = Math.min(...weightState.history);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Прогресс</Text>

        {/* Top Navigator Tabs */}
        <View style={styles.tabs}>
          {(['weight', 'measurements', 'photos'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.tabActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === 'weight' ? 'Вес' : t === 'measurements' ? 'Объём' : 'Фото'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weight Overview */}
        <View style={styles.weightCard}>
          <View style={styles.weightRow}>
            <Text style={styles.weightValue}>
              {weightState.current} <Text style={styles.weightUnit}>{weightState.unit}</Text>
            </Text>
            <View style={styles.changeBadge}>
              <Text style={styles.changeText}>
                {weightState.change > 0 ? '+' : ''}{weightState.change} {weightState.unit}
              </Text>
            </View>
          </View>
          <Text style={styles.weightPeriod}>изменение за 4 недели</Text>

          {/* Interactive Line Chart from gifted-charts */}
          <View style={styles.chartWrapper}>
            <LineChart
              data={lineData}
              thickness={4}
              color={Colors.accentPurple}
              startFillColor={Colors.accentPurple}
              endFillColor={Colors.backgroundCard}
              startOpacity={0.8}
              endOpacity={0.0}
              initialSpacing={15}
              noOfSections={3}
              stepValue={minVal * 0.1}
              height={140}
              curved
              hideRules
              yAxisThickness={0}
              xAxisThickness={0}
              hideYAxisText
              dataPointsColor={Colors.accentPurple}
              dataPointsRadius={5}
              textShiftY={-12}
              textColor={Colors.textMuted}
              textFontSize={10}
            />
          </View>

          {/* Add Data Button */}
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
            <Plus size={20} color={Colors.textPrimary} />
            <Text style={styles.addBtnText}>Добавить данные</Text>
          </TouchableOpacity>
        </View>

        {/* Body composition List */}
        <Text style={styles.sectionTitle}>Последние показатели</Text>
        <View style={styles.compCard}>
          {MOCK_BODY_COMP.map((item, i) => (
            <View key={i} style={styles.compRow}>
              <Text style={styles.compLabel}>{item.label}</Text>
              <Text style={styles.compValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: Spacing.huge, gap: Spacing.md },
  screenTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },
  
  tabs: { flexDirection: 'row', backgroundColor: Colors.backgroundCard, borderRadius: Radius.full, padding: 4, alignSelf: 'flex-start' },
  tab: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full },
  tabActive: { backgroundColor: Colors.accentPurple },
  tabText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
  tabTextActive: { color: Colors.textPrimary, fontWeight: Typography.fontWeight.semiBold },
  
  weightCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.sm },
  weightRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  weightValue: { color: Colors.textPrimary, fontSize: 36, fontWeight: Typography.fontWeight.bold },
  weightUnit: { fontSize: 20, color: Colors.textSecondary, fontWeight: Typography.fontWeight.medium },
  changeBadge: { backgroundColor: Colors.accentGreen + '30', borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 6 },
  changeText: { color: Colors.accentGreen, fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold },
  weightPeriod: { color: Colors.textSecondary, fontSize: Typography.fontSize.xs },
  
  chartWrapper: { marginVertical: Spacing.base, marginHorizontal: -10 },
  
  addBtn: { flexDirection: 'row', gap: Spacing.xs, backgroundColor: Colors.accentPurple, borderRadius: Radius.full, padding: Spacing.md, alignItems: 'center', justifyContent: 'center', marginTop: Spacing.sm },
  addBtnText: { color: Colors.textPrimary, fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semiBold },
  
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, marginTop: Spacing.sm },
  compCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, overflow: 'hidden' },
  compRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  compLabel: { color: Colors.textSecondary, fontSize: Typography.fontSize.base },
  compValue: { color: Colors.textPrimary, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semiBold },
});
