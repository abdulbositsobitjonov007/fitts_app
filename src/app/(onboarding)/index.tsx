import { Colors } from '@/constants/colors';
import { Config } from '@/constants/config';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';

// Splash screen — shows briefly then goes to onboarding slides
export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(onboarding)/slides');
    }, Config.splashDuration || 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/onboarding/onLoadingWallpaper.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Dark overlay with subtle gradient for optimal text and logo contrast */}
      <View style={[StyleSheet.absoluteFill as any, { backgroundColor: 'rgba(10, 12, 26, 0.35)' }]} />

      {/* Logo & Tagline */}
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('@/assets/images/logos/fittsLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.tagline}>Твой путь к лучшей версии себя</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '15%',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    width: 220,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
