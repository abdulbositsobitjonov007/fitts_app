import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

const { width, height } = Dimensions.get('window');

// Three onboarding slides matching the mockup
const slides = [
  {
    id: '1',
    image: require('@/assets/images/onboarding/reachingGoals.png'),
    title: 'Цель имеет значение',
    description:
      'NexFit поможет тебе достичь своих целей: будь то стройное тело, больше энергии или просто лучшее самочувствие.',
  },
  {
    id: '2',
    image: require('@/assets/images/onboarding/nutritionRules.png'),
    title: 'Правильное питание',
    description:
      'Умные рекомендации по питанию под твои цели, вес, активность и предпочтения.',
  },
  {
    id: '3',
    image: require('@/assets/images/onboarding/personalTrainings.png'),
    title: 'Персональные тренировки',
    description:
      'Программа тренировок адаптируется под твой уровень, прогресс и возможности.',
  },
];

export default function SlidesScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  function goNext() {
    if (activeIndex < slides.length - 1) {
      const next = activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next });
      setActiveIndex(next);
    } else {
      router.replace('/(onboarding)/goal-selection');
    }
  }

  function skip() {
    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />
              {/* Fade to black gradient to blend the image into the background */}
              <ExpoLinearGradient
                colors={['transparent', Colors.background]}
                style={styles.imageGradient}
                locations={[0.5, 1]}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <View style={styles.bottomSection}>
              {/* Dots */}
              <View style={styles.dots}>
                {slides.map((_, i) => (
                  <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
                ))}
              </View>

              {/* Actions */}
              <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={goNext}>
                <ExpoLinearGradient
                  colors={['#8B5CF6', '#3B82F6']} // Gradient matching mockup
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Далее →</Text>
                </ExpoLinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={skip} style={styles.skipButton}>
                <Text style={styles.skipText}>Пропустить</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slide: {
    width,
    height,
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.6, // Image takes top ~60%
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFill as any,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: -20, // Pull text up into the gradient fade
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  description: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: '#3B82F6',
    width: 24,
  },
  buttonWrapper: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: Typography.fontSize.sm,
  },
});
