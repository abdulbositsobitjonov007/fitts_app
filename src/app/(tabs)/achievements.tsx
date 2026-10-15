import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar,
} from 'react-native';
import {
  Footprints, Dumbbell, Salad, Droplets, Bike,
  TrendingDown, Moon, Flame, Trophy, Star, Lock,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: GET /api/achievements  →  { items: [...], stats: { total, unlocked } }

type AchievTab = 'all' | 'workouts' | 'nutrition' | 'other';

type Achievement = {
  id: string;
  Icon: any;
  iconColor: string;
  bg: string;
  title: string;
  desc: string;
  unlocked: boolean;
  category: AchievTab;
};

const ACHIEVEMENTS: Achievement[] = [
  { id: '1', Icon: Footprints, iconColor: '#60A5FA', bg: 'rgba(96,165,250,0.15)',   title: 'Первые шаги', desc: '1 000 шагов',  unlocked: true,  category: 'other' },
  { id: '2', Icon: Dumbbell,   iconColor: '#A78BFA', bg: 'rgba(167,139,250,0.15)', title: 'Сила',        desc: '10 тренировок', unlocked: true,  category: 'workouts' },
  { id: '3', Icon: Salad,      iconColor: '#34D399', bg: 'rgba(52,211,153,0.15)',   title: 'Питание',     desc: '7 дней',        unlocked: true,  category: 'nutrition' },
  { id: '4', Icon: Droplets,   iconColor: '#38BDF8', bg: 'rgba(56,189,248,0.15)',   title: 'Гидратация',  desc: '7 дней нормы', unlocked: true,  category: 'other' },
  { id: '5', Icon: Bike,       iconColor: '#FB923C', bg: 'rgba(251,146,60,0.15)',   title: 'Выносливость', desc: '100 км',       unlocked: true,  category: 'workouts' },
  { id: '6', Icon: TrendingDown, iconColor: '#10B981', bg: 'rgba(16,185,129,0.15)', title: 'Прогресс',  desc: '-5 кг',          unlocked: true,  category: 'other' },
  { id: '7', Icon: Moon,       iconColor: '#8B5CF6', bg: 'rgba(139,92,246,0.15)',   title: 'Сон',         desc: '7 дней норм.',  unlocked: false, category: 'other' },
  { id: '8', Icon: Flame,      iconColor: '#EF4444', bg: 'rgba(239,68,68,0.15)',    title: 'Огонь',       desc: '180 км',        unlocked: false, category: 'workouts' },
  { id: '9', Icon: Trophy,     iconColor: '#F59E0B', bg: 'rgba(245,158,11,0.15)',   title: 'Легенда',     desc: '30 дней подряд', unlocked: false, category: 'other' },
];

const TAB_LABELS: Record<AchievTab, string> = {
  all: 'Все',
  workouts: 'Тренировки',
  nutrition: 'Питание',
  other: 'Другое',
};

export default function AchievementsScreen() {
  const [tab, setTab] = useState<AchievTab>('all');

  const filtered = tab === 'all' ? ACHIEVEMENTS : ACHIEVEMENTS.filter((a) => a.category === tab);
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  const total = ACHIEVEMENTS.length;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <Text style={styles.screenTitle}>Достижения</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Star size={20} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.statValue}>{unlocked}</Text>
            <Text style={styles.statLabel}>Открыто</Text>
          </View>
          <View style={styles.statCard}>
            <Lock size={20} color={Colors.textMuted} />
            <Text style={styles.statValue}>{total - unlocked}</Text>
            <Text style={styles.statLabel}>Ещё впереди</Text>
          </View>
          <View style={styles.statCard}>
            <Trophy size={20} color="#A78BFA" />
            <Text style={styles.statValue}>{Math.round((unlocked / total) * 100)}%</Text>
            <Text style={styles.statLabel}>Прогресс</Text>
          </View>
        </View>

        {/* Overall progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(unlocked / total) * 100}%` }]} />
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabs}>
            {(Object.keys(TAB_LABELS) as AchievTab[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tab, tab === t && styles.tabActive]}
                onPress={() => setTab(t)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                  {TAB_LABELS[t]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Badge grid */}
        <View style={styles.grid}>
          {filtered.map((a) => {
            const { Icon } = a;
            return (
              <View key={a.id} style={[styles.badge, !a.unlocked && styles.badgeLocked]}>
                <View style={[styles.badgeIcon, { backgroundColor: a.unlocked ? a.bg : 'rgba(255,255,255,0.05)' }]}>
                  {a.unlocked
                    ? <Icon size={28} color={a.iconColor} />
                    : <Lock size={24} color={Colors.textMuted} />
                  }
                </View>
                <Text style={[styles.badgeTitle, !a.unlocked && styles.dimmedText]}>{a.title}</Text>
                <Text style={styles.badgeDesc}>{a.desc}</Text>
                {a.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Star size={9} color="#F59E0B" fill="#F59E0B" />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: 56, paddingBottom: 100, gap: Spacing.md },
  screenTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },

  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statCard: { flex: 1, backgroundColor: Colors.backgroundCard, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 4 },
  statValue: { color: Colors.textPrimary, fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold },
  statLabel: { color: Colors.textSecondary, fontSize: Typography.fontSize.xs, textAlign: 'center' },

  progressBg: { height: 8, backgroundColor: Colors.backgroundElevated, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#F59E0B', borderRadius: 4 },

  tabs: { flexDirection: 'row', gap: Spacing.sm, paddingVertical: 2 },
  tab: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border },
  tabActive: { backgroundColor: Colors.accentPurple, borderColor: Colors.accentPurple },
  tabText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },
  tabTextActive: { color: '#FFF', fontWeight: Typography.fontWeight.semiBold },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  badge: { width: '30%', flexGrow: 1, backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center', gap: 6 },
  badgeLocked: { opacity: 0.45 },
  badgeIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  badgeTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.semiBold, textAlign: 'center' },
  dimmedText: { color: Colors.textMuted },
  badgeDesc: { color: Colors.textMuted, fontSize: 9, textAlign: 'center' },
  unlockedBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(245,158,11,0.2)', borderRadius: 8, padding: 3 },
});
