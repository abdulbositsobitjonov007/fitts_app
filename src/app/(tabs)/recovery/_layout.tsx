import { Stack } from 'expo-router';
export default function RecoveryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="water" />
      <Stack.Screen name="sleep" />
    </Stack>
  );
}
