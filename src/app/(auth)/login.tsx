import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';
import { Input } from '@/components/common/Input';

type AuthMode = 'login' | 'register';

export default function LoginScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleAuth() {
    // TODO: call real auth API
    router.replace('/(tabs)');
  }

  function handleGoogle() {
    // TODO: trigger Google OAuth
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoAccent}>Fitts</Text>
          </Text>
          <Text style={styles.welcome}>
            {mode === 'login' ? 'Добро пожаловать!' : 'Создать аккаунт'}
          </Text>
          <Text style={styles.subtitle}>
            {mode === 'login'
              ? 'Войди в свой аккаунт или создай новый,\nчтобы начать путь к цели.'
              : 'Заполни данные ниже, чтобы создать аккаунт.'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Google button with real logo image */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogle} activeOpacity={0.8}>
            <Image
              source={require('@/assets/images/logos/googleLogo.png')}
              style={styles.googleLogo}
              resizeMode="contain"
            />
            <Text style={styles.googleLabel}>Продолжить с Google</Text>
          </TouchableOpacity>

          <Input
            label="Email"
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label="Пароль"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {mode === 'login' && (
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Забыли пароль?</Text>
            </TouchableOpacity>
          )}

          {/* Gradient Login Button */}
          <TouchableOpacity style={styles.authButtonWrapper} onPress={handleAuth} activeOpacity={0.85}>
            <ExpoLinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.authGradientButton}
            >
              <Text style={styles.authButtonText}>
                {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
              </Text>
            </ExpoLinearGradient>
          </TouchableOpacity>

          {/* Outline create account button (only shown in login mode) */}
          {mode === 'login' && (
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => setMode('register')}
              activeOpacity={0.8}
            >
              <Text style={styles.outlineButtonText}>Создать аккаунт</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Footer toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>
            {mode === 'login' ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          </Text>
          <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
            <Text style={styles.toggleAction}>
              {mode === 'login' ? 'Войти' : 'Войти'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.huge,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoText: {
    fontSize: 40,
    fontWeight: Typography.fontWeight.extraBold,
    color: Colors.textPrimary,
  },
  logoAccent: {
    color: Colors.accentPurple,
  },
  welcome: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    gap: Spacing.base,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.full,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 52,
  },
  googleLogo: {
    width: 22,
    height: 22,
  },
  googleLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
  },
  forgotPassword: {
    color: Colors.accentPurple,
    fontSize: Typography.fontSize.sm,
    textAlign: 'right',
  },
  authButtonWrapper: {
    height: 52,
    borderRadius: Radius.full,
    overflow: 'hidden',
    marginTop: Spacing.sm,
  },
  authGradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButtonText: {
    color: '#FFF',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  outlineButton: {
    height: 52,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.base,
  },
  toggleAction: {
    color: Colors.accentPurple,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
});
