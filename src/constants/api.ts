// API configuration (placeholder for future backend)
export const API = {
  baseUrl: 'https://api.nexfit.app/v1',
  timeout: 10000, // ms

  endpoints: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/user/profile',
    workouts: '/workouts',
    nutrition: '/nutrition',
    activity: '/activity',
    progress: '/progress',
  },
} as const;
