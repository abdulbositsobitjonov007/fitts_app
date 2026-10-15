// NexFit Color Palette — Dark Theme
export const Colors = {
  // Backgrounds
  background: '#0D0E1A',
  backgroundCard: '#161829',
  backgroundElevated: '#1E2035',
  backgroundInput: '#1A1C2E',

  // Accent
  accentPurple: '#7B5EA7',
  accentBlue: '#4A90D9',
  accentGreen: '#4CAF82',
  accentOrange: '#F5884A',
  accentRed: '#E05252',
  accentYellow: '#F5C842',

  // Gradient pairs (start, end)
  gradientPurpleBlue: ['#7B5EA7', '#4A90D9'] as [string, string],
  gradientGreen: ['#4CAF82', '#2E8B5A'] as [string, string],

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8A8FA8',
  textMuted: '#555870',
  textAccent: '#7B5EA7',

  // Border
  border: '#252740',
  borderLight: '#2E3150',

  // Tab bar
  tabBarBackground: '#12142A',
  tabBarActive: '#7B5EA7',
  tabBarInactive: '#555870',

  // Status
  success: '#4CAF82',
  warning: '#F5C842',
  error: '#E05252',
  info: '#4A90D9',

  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(255, 255, 255, 0.05)',
} as const;
