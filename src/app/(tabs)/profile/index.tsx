import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { Target, User, Bell, Ruler, Moon, Globe, HelpCircle, Info, ChevronRight, PenLine, LogOut } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: GET /api/user/profile
// TODO: POST /api/user/settings

const MOCK_USER = {
  name: 'Abdulbosit Sobitjonov',
  plan: 'Premium 👑',
  weight: '74.2 кг',
  height: '180 см',
  age: 23,
};

type MenuItem = {
  icon: any;
  label: string;
  hasArrow?: boolean;
  value?: string;
  hasToggle?: boolean;
  isDestructive?: boolean;
  action?: () => void;
};

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  function handleLogout() {
    Alert.alert(
      'Выйти из аккаунта?',
      'Для возвращения потребуется ввести пароль.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: () => router.replace('/(auth)' as any) },
      ]
    );
  }

  const menuItems: MenuItem[] = [
    { icon: Target, label: 'Мои цели', hasArrow: true },
    { icon: User, label: 'Личные данные', hasArrow: true },
    { icon: Bell, label: 'Уведомления', hasToggle: true, value: notifications ? 'Вкл' : 'Выкл', action: () => setNotifications(!notifications) },
    { icon: Ruler, label: 'Единицы измерения', hasArrow: true, value: 'Метр./Кг' },
    { icon: Moon, label: 'Тёмная тема', hasToggle: true, action: () => setDarkMode(!darkMode) },
    { icon: Globe, label: 'Язык', value: 'Русский', hasArrow: true },
    { icon: HelpCircle, label: 'Поддержка', hasArrow: true },
    { icon: Info, label: 'О приложении', hasArrow: true },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Настройки</Text>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
             <User size={32} color={Colors.textPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.userPlan}>{MOCK_USER.plan}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <PenLine size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
           <View style={styles.statBox}>
             <Text style={styles.statVal}>{MOCK_USER.weight}</Text>
             <Text style={styles.statLabel}>Вес</Text>
           </View>
           <View style={styles.statLine} />
           <View style={styles.statBox}>
             <Text style={styles.statVal}>{MOCK_USER.height}</Text>
             <Text style={styles.statLabel}>Рост</Text>
           </View>
           <View style={styles.statLine} />
           <View style={styles.statBox}>
             <Text style={styles.statVal}>{MOCK_USER.age}</Text>
             <Text style={styles.statLabel}>Возраст</Text>
           </View>
        </View>

        {/* Settings list */}
        <View style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuRow, i < menuItems.length - 1 && styles.menuRowBorder]}
              activeOpacity={item.hasToggle ? 1 : 0.7}
              onPress={() => {
                if (item.action) item.action();
              }}
            >
              <item.icon size={22} color={item.isDestructive ? Colors.accentOrange : Colors.textSecondary} />
              <Text style={[styles.menuLabel, item.isDestructive && { color: Colors.accentOrange }]}>{item.label}</Text>
              
              {item.hasToggle ? (
                <Switch
                  value={item.label === 'Тёмная тема' ? darkMode : notifications}
                  onValueChange={item.action}
                  trackColor={{ false: Colors.border, true: Colors.accentPurple }}
                  thumbColor={Colors.textPrimary}
                />
              ) : (
                <>
                  {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                  {item.hasArrow && <ChevronRight size={18} color={Colors.textMuted} />}
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut size={20} color={Colors.accentOrange} />
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>NexFit v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: 56, gap: Spacing.md, paddingBottom: 100 },
  screenTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.xxl, fontWeight: Typography.fontWeight.bold },
  
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.md },
  avatarCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.backgroundElevated, alignItems: 'center', justifyContent: 'center' },
  userName: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  userPlan: { color: '#F59E0B', fontSize: Typography.fontSize.sm, marginTop: 2 },
  editBtn: { padding: Spacing.sm },

  statsRow: { flexDirection: 'row', backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, paddingVertical: Spacing.base },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statLine: { width: 1, backgroundColor: Colors.border },
  statVal: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: 'bold' },
  statLabel: { color: Colors.textSecondary, fontSize: Typography.fontSize.xs },

  menuCard: { backgroundColor: Colors.backgroundCard, borderRadius: Radius.lg, overflow: 'hidden' },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: Spacing.md },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuLabel: { flex: 1, color: Colors.textPrimary, fontSize: Typography.fontSize.base },
  menuValue: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: 'rgba(239,68,68,0.1)', paddingVertical: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.sm },
  logoutText: { color: Colors.accentOrange, fontSize: Typography.fontSize.md, fontWeight: 'bold' },

  versionText: { color: Colors.textMuted, fontSize: Typography.fontSize.xs, textAlign: 'center', marginTop: Spacing.xl },
});
