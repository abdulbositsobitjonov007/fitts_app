// App-wide configuration constants
export const Config = {
  appName: 'NexFit',
  appTagline: 'Твой путь к лучшей версии себя',
  version: '1.0.0',

  // Daily goals (defaults)
  defaultCalorieGoal: 2250,
  defaultStepsGoal: 12000,
  defaultWaterGoal: 2600, // ml
  defaultSleepGoal: 8,    // hours

  // UI
  animationDuration: 300, // ms
  splashDuration: 2000,   // ms
} as const;
