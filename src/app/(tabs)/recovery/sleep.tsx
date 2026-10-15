import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Modal, TextInput, Alert,
} from 'react-native';
import { Moon, Star, Clock, AlarmClock, X, Check } from 'lucide-react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: GET /api/recovery/sleep/today
// TODO: POST /api/recovery/sleep/log  { bedtime, wakeTime, quality }

const MOCK_SLEEP = {
  hours: 7,
  minutes: 32,
  quality: 'Отлично',
  score: 87,
  bedtime: '23:15',
  wakeTime: '06:47',
};

const SLEEP_PHASES = [
  { label: 'Глубокий', duration: '2 ч 18 мин', pct: 31, color: '#8B5CF6' },
  { label: 'Лёгкий',   duration: '4 ч 32 мин', pct: 60, color: '#3B82F6' },
  { label: 'REM',      duration: '0 ч 42 мин',  pct: 9,  color: '#10B981' },
];

const WEEK_BARS = [
  { value: 6.5, label: 'Пн', frontColor: Colors.backgroundElevated },
  { value: 7.0, label: 'Вт', frontColor: Colors.backgroundElevated },
  { value: 5.5, label: 'Ср', frontColor: Colors.backgroundElevated },
  { value: 8.0, label: 'Чт', frontColor: Colors.backgroundElevated },
  { value: 7.2, label: 'Пт', frontColor: Colors.backgroundElevated },
  { value: 6.0, label: 'Сб', frontColor: Colors.backgroundElevated },
  { value: 7.5, label: 'Вс', frontColor: '#8B5CF6' },
];

const QUALITY_COLORS: Record<string, string> = {
  'Отлично': '#10B981',
  'Хорошо': '#3B82F6',
  'Плохо': '#EF4444',
};

export default function SleepScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bedtime, setBedtime] = useState('23:15');
  const [wakeTime, setWakeTime] = useState('06:47');
  const [sleep, setSleep] = useState(MOCK_SLEEP);
  const maxBar = Math.max(...WEEK_BARS.map((b) => b.value));

  function saveSleep() {
    // TODO: POST /api/recovery/sleep/log { bedtime, wakeTime }
    // For now, calculate hours from mock times
    setModalVisible(false);
    Alert.alert('Сохранено!', `Сон с ${bedtime} до ${wakeTime} записан.`);
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Сон</Text>
          <TouchableOpacity style={styles.logBtn} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
            <AlarmClock size={16} color="#FFF" />
            <Text style={styles.logBtnText}>Записать</Text>
          </TouchableOpacity>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          <View style={styles.scoreRow}>
            <Moon size={40} color="#8B5CF6" />
            <View>
              <Text style={styles.duration}>{sleep.hours} ч {sleep.minutes} мин</Text>
              <Text style={[styles.quality, { color: QUALITY_COLORS[sleep.quality] || Colors.accentGreen }]}>
                {sleep.quality}
              </Text>
            </View>
            <View style={styles.scoreBadge}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.scoreText}>{sleep.score}</Text>
            </View>
          </View>

          {/* Bedtime / Wake */}
          <View style={styles.timeRow}>
            <View style={styles.timeItem}>
              <Clock size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.timeLabel}>Отбой</Text>
                <Text style={styles.timeValue}>{sleep.bedtime}</Text>
              </View>
            </View>
            <View style={styles.timeDivider} />
            <View style={styles.timeItem}>
              <Clock size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.timeLabel}>Подъём</Text>
                <Text style={styles.timeValue}>{sleep.wakeTime}</Text>
              </View>
            </View>
          </View>

          {/* Phases */}
          <View style={styles.phases}>
            {SLEEP_PHASES.map((phase) => (
              <View key={phase.label} style={styles.phaseItem}>
                <View style={[styles.phaseDot, { backgroundColor: phase.color }]} />
                <Text style={styles.phaseLabel}>{phase.label}</Text>
                <View style={styles.phaseBarBg}>
                  <View style={[styles.phaseBarFill, { width: `${phase.pct}%`, backgroundColor: phase.color }]} />
                </View>
                <Text style={styles.phasePct}>{phase.pct}%</Text>
                <Text style={styles.phaseDuration}>{phase.duration}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly chart */}
        <Text style={styles.sectionTitle}>История за неделю</Text>
        <View style={styles.chartCard}>
          <BarChart
            data={WEEK_BARS}
            barWidth={26} spacing={18}
            roundedTop roundedBottom
            hideRules
            xAxisThickness={0} yAxisThickness={0}
            yAxisTextStyle={{ color: Colors.textMuted, fontSize: 10 }}
            xAxisLabelTextStyle={{ color: Colors.textMuted, fontSize: 10, textAlign: 'center' }}
            noOfSections={3}
            maxValue={Math.ceil(maxBar * 1.2)}
            height={160}
            initialSpacing={10}
          />
        </View>

        {/* Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Совет</Text>
          <Text style={styles.tipText}>
            Старайся ложиться в одно и то же время. Стабильный режим улучшает качество и продолжительность сна.
          </Text>
        </View>
      </ScrollView>

      {/* Log Sleep Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Записать сон</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={22} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Время отбоя (чч:мм)</Text>
            <TextInput
              style={styles.input}
              value={bedtime}
              onChangeText={setBedtime}
              placeholder="23:15"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numbers-and-punctuation"
            />

            <Text style={styles.inputLabel}>Время подъёма (чч:мм)</Text>
            <TextInput
              style={styles.input}
              value={wakeTime}
              onChangeText={setWakeTime}
              placeholder="06:47"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numbers-and-punctuation"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={saveSleep} activeOpacity={0.85}>
              <Check size={18} color="#FFF" />
              <Text style={styles.saveBtnText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: 56, paddingBottom: 100, gap: Spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },
  logBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.accentPurple, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 8 },
  logBtnText: { color: '#FFF', fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semiBold },

  mainCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.md },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  duration: { color: Colors.textPrimary, fontSize: 28, fontWeight: 'bold' },
  quality: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semiBold, marginTop: 2 },
  scoreBadge: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(245,158,11,0.15)', borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  scoreText: { color: '#F59E0B', fontWeight: 'bold', fontSize: Typography.fontSize.sm },

  timeRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.backgroundElevated, borderRadius: Radius.md, padding: Spacing.md },
  timeItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  timeDivider: { width: 1, height: 36, backgroundColor: Colors.border, marginHorizontal: Spacing.md },
  timeLabel: { color: Colors.textMuted, fontSize: 11 },
  timeValue: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: 'bold' },

  phases: { gap: Spacing.sm },
  phaseItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  phaseDot: { width: 10, height: 10, borderRadius: 5 },
  phaseLabel: { width: 60, color: Colors.textSecondary, fontSize: Typography.fontSize.xs },
  phaseBarBg: { flex: 1, height: 6, backgroundColor: Colors.backgroundElevated, borderRadius: 3, overflow: 'hidden' },
  phaseBarFill: { height: '100%', borderRadius: 3 },
  phasePct: { width: 30, color: Colors.textMuted, fontSize: 10, textAlign: 'right' },
  phaseDuration: { width: 80, color: Colors.textSecondary, fontSize: 10 },

  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  chartCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, paddingTop: Spacing.lg },

  tipCard: { backgroundColor: Colors.backgroundElevated, borderRadius: Radius.md, padding: Spacing.base, gap: Spacing.sm, borderLeftWidth: 3, borderLeftColor: '#F59E0B' },
  tipTitle: { color: '#F59E0B', fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.bold },
  tipText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm, lineHeight: 20 },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modal: { backgroundColor: Colors.backgroundCard, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: Spacing.xl, gap: Spacing.md, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold },
  inputLabel: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
  input: { backgroundColor: Colors.backgroundElevated, borderRadius: Radius.md, padding: Spacing.md, color: Colors.textPrimary, fontSize: Typography.fontSize.lg, borderWidth: 1, borderColor: Colors.border },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.accentPurple, borderRadius: Radius.full, paddingVertical: 14, marginTop: Spacing.sm },
  saveBtnText: { color: '#FFF', fontSize: Typography.fontSize.md, fontWeight: 'bold' },
});
