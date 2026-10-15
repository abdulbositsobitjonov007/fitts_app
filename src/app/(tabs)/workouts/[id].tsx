import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Play, Dumbbell, Clock, Flame, CheckCircle } from 'lucide-react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

const MOCK_DETAIL = {
  title: 'Верхняя часть тела',
  duration: '45 мин',
  level: 'Средний уровень',
  calories: 320,
  exercises: [
    { title: 'Отжимания', reps: '3 подхода x 15', duration: '5 мин' },
    { title: 'Подтягивания', reps: '3 подхода x 10', duration: '7 мин' },
    { title: 'Жим гантелей лёжа', reps: '4 подхода x 12', duration: '10 мин' },
    { title: 'Скручивания на пресс', reps: '3 подхода x 20', duration: '5 мин' },
  ]
};

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop' }}
        style={styles.headerImg}
      >
        <ExpoLinearGradient
          colors={['rgba(18,20,42,0.1)', '#12142A']}
          style={StyleSheet.absoluteFill as any}
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={28} color="#FFF" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <View style={styles.badge}>
            <Dumbbell size={14} color="#A78BFA" />
            <Text style={styles.badgeText}>Сила</Text>
          </View>
          <Text style={styles.title}>{MOCK_DETAIL.title}</Text>
          <View style={styles.metaRow}>
            <Clock size={16} color={Colors.textMuted} />
            <Text style={styles.metaText}>{MOCK_DETAIL.duration}</Text>
            <View style={styles.dot} />
            <Flame size={16} color={Colors.textMuted} />
            <Text style={styles.metaText}>{MOCK_DETAIL.calories} ккал</Text>
            <View style={styles.dot} />
            <Text style={styles.metaText}>{MOCK_DETAIL.level}</Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Упражнения</Text>
        
        <View style={styles.list}>
          {MOCK_DETAIL.exercises.map((ex, i) => (
            <View key={i} style={styles.exCard}>
              <View style={styles.exIcon}>
                <CheckCircle size={20} color={Colors.accentPurple} />
              </View>
              <View style={styles.exInfo}>
                <Text style={styles.exTitle}>{ex.title}</Text>
                <Text style={styles.exMeta}>{ex.reps} • {ex.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startBtn} activeOpacity={0.8} onPress={() => router.back()}>
          <Play size={20} color="#FFF" fill="#FFF" />
          <Text style={styles.startBtnText}>Начать тренировку</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  headerImg: { width: '100%', height: 300, justifyContent: 'flex-end', padding: Spacing.base },
  backBtn: { position: 'absolute', top: 56, left: 16, width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerInfo: { gap: Spacing.sm },
  badge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 4, backgroundColor: 'rgba(167,139,250,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radius.full },
  badgeText: { color: '#A78BFA', fontSize: 12, fontWeight: 'bold' },
  title: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: Colors.textSecondary, fontSize: 13 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.textMuted },
  
  content: { padding: Spacing.base, paddingBottom: 100, gap: Spacing.md },
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: 'bold' },
  list: { gap: Spacing.sm },
  exCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.backgroundCard, padding: Spacing.md, borderRadius: Radius.md },
  exIcon: { width: 40, height: 40, borderRadius: Radius.full, backgroundColor: 'rgba(167,139,250,0.1)', alignItems: 'center', justifyContent: 'center' },
  exInfo: { flex: 1, gap: 4 },
  exTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.base, fontWeight: '600' },
  exMeta: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.base, backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.border },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.accentPurple, paddingVertical: 16, borderRadius: Radius.full },
  startBtnText: { color: '#FFF', fontSize: Typography.fontSize.md, fontWeight: 'bold' },
});
