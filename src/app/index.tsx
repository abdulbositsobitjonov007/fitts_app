import { Redirect } from 'expo-router';

// Entry point — redirect to onboarding by default
// In a real app you'd check AsyncStorage for completed onboarding + auth token
export default function Index() {
  return <Redirect href="/(onboarding)" />;
}
