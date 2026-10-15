// Route constants for Expo Router
export const Routes = {
  // Onboarding
  onboardingSplash: '/(onboarding)/',
  onboardingSlides: '/(onboarding)/slides',
  onboardingGoal: '/(onboarding)/goal-selection',

  // Auth
  login: '/(auth)/login',

  // Main tabs
  home: '/(tabs)/',
  workouts: '/(tabs)/workouts/',
  workoutDetail: '/(tabs)/workouts/[id]',
  nutrition: '/(tabs)/nutrition/',
  activity: '/(tabs)/activity',
  progress: '/(tabs)/progress/',
  water: '/(tabs)/recovery/water',
  sleep: '/(tabs)/recovery/sleep',
  calendar: '/(tabs)/calendar',
  achievements: '/(tabs)/achievements',
  aiCoach: '/(tabs)/ai-coach',
  profile: '/(tabs)/profile/',
} as const;
