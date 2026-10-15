import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { Dumbbell, Utensils, Moon, ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: GET /api/calendar/events?month=2026-10   →  events[]
// TODO: POST /api/calendar/events                →  create new event

type Event = { id: string; day: number; type: string; label: string; time: string; Icon: any; color: string };

const EVENTS: Event[] = [
  { id: '1', day: 11, type: 'workout',   label: 'Тренировка: Верх тела', time: '18:00', Icon: Dumbbell, color: '#A78BFA' },
  { id: '2', day: 11, type: 'nutrition', label: 'Замер: Питание',        time: '20:00', Icon: Utensils, color: '#60A5FA' },
  { id: '3', day: 14, type: 'workout',   label: 'Кардио',                time: '07:30', Icon: Dumbbell, color: '#FB923C' },
  { id: '4', day: 18, type: 'workout',   label: 'Силовая тренировка',    time: '19:00', Icon: Dumbbell, color: '#A78BFA' },
  { id: '5', day: 18, type: 'nutrition', label: 'Приём у диетолога',     time: '11:00', Icon: Utensils, color: '#34D399' },
  { id: '6', day: 21, type: 'workout',   label: 'Нижняя часть тела',     time: '19:00', Icon: Dumbbell, color: '#A78BFA' },
  { id: '7', day: 21, type: 'sleep',     label: 'Цель: лечь в 23:00',    time: '23:00', Icon: Moon,    color: '#8B5CF6' },
  { id: '8', day: 25, type: 'workout',   label: 'HIIT тренировка',       time: '08:00', Icon: Dumbbell, color: '#EF4444' },
];

const MONTH_NAMES = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const WEEK_HEADERS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function buildGrid(year: number, month: number) {
  const firstDayWeekday = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1; // convert to Mon-start
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function CalendarScreen() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState(now.getDate());
  const today = now.getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  const cells = useMemo(() => buildGrid(year, month), [year, month]);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  // Days that have events (for current mock)
  const daysWithEvents = new Set(EVENTS.map((e) => e.day));
  const selectedEvents = EVENTS.filter((e) => e.day === selected);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Календарь</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Plus size={22} color={Colors.accentPurple} />
          </TouchableOpacity>
        </View>

        {/* Month Nav */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.navBtn} onPress={prevMonth}>
            <ChevronLeft size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.monthName}>{MONTH_NAMES[month]} {year}</Text>
          <TouchableOpacity style={styles.navBtn} onPress={nextMonth}>
            <ChevronRight size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Week headers */}
        <View style={styles.weekRow}>
          {WEEK_HEADERS.map((h) => (
            <Text key={h} style={styles.weekHeader}>{h}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.grid}>
          {cells.map((day, i) => {
            if (!day) return <View key={`e${i}`} style={styles.cell} />;
            const isSel = day === selected;
            const isTod = day === today && isCurrentMonth;
            const hasEv = daysWithEvents.has(day);
            return (
              <TouchableOpacity
                key={day}
                style={[styles.cell, isSel && styles.cellSelected, isTod && !isSel && styles.cellToday]}
                onPress={() => setSelected(day)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dayText, isSel && styles.dayTextSelected, isTod && !isSel && styles.dayTextToday]}>
                  {day}
                </Text>
                {hasEv && <View style={[styles.eventDot, isSel && styles.eventDotSelected]} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Events for selected day */}
        <View style={styles.eventsHeader}>
          <Text style={styles.sectionTitle}>
            {selected} {MONTH_NAMES[month]} {isCurrentMonth && selected === today ? '(сегодня)' : ''}
          </Text>
        </View>

        {selectedEvents.length === 0 ? (
          <View style={styles.emptyEvents}>
            <Text style={styles.emptyText}>Нет событий на этот день</Text>
          </View>
        ) : (
          <View style={styles.eventList}>
            {selectedEvents.map((ev) => (
              <View key={ev.id} style={styles.eventRow}>
                <View style={[styles.eventIconBox, { backgroundColor: ev.color + '22' }]}>
                  <ev.Icon size={22} color={ev.color} />
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventLabel}>{ev.label}</Text>
                  <Text style={styles.eventTypeBadge}>{ev.type}</Text>
                </View>
                <Text style={styles.eventTime}>{ev.time}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: 56, paddingBottom: 100, gap: Spacing.md },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  screenTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },
  addBtn: { padding: 8 },

  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  navBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.backgroundCard, borderRadius: Radius.md },
  monthName: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },

  weekRow: { flexDirection: 'row' },
  weekHeader: { flex: 1, textAlign: 'center', color: Colors.textMuted, fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.semiBold },

  grid: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.sm },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: Radius.md },
  cellSelected: { backgroundColor: Colors.accentPurple },
  cellToday: { borderWidth: 1.5, borderColor: Colors.accentPurple },
  dayText: { color: Colors.textPrimary, fontSize: Typography.fontSize.sm },
  dayTextSelected: { fontWeight: 'bold', color: '#FFF' },
  dayTextToday: { color: Colors.accentPurple, fontWeight: 'bold' },
  eventDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.accentPurple, marginTop: 2 },
  eventDotSelected: { backgroundColor: 'rgba(255,255,255,0.8)' },

  eventsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  emptyEvents: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.md, padding: Spacing.xl, alignItems: 'center' },
  emptyText: { color: Colors.textSecondary, fontSize: Typography.fontSize.base },
  eventList: { gap: Spacing.sm },
  eventRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.backgroundCard, borderRadius: Radius.md, padding: Spacing.md, gap: Spacing.md },
  eventIconBox: { width: 44, height: 44, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  eventInfo: { flex: 1, gap: 2 },
  eventLabel: { color: Colors.textPrimary, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.medium },
  eventTypeBadge: { color: Colors.textMuted, fontSize: Typography.fontSize.xs },
  eventTime: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
});
