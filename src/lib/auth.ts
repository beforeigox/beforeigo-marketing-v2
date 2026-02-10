// Placeholder auth module - will be replaced with Supabase auth
export interface User {
  uid: string;
  email: string | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  plan: 'starter' | 'premium' | 'legacy';
  createdAt: Date;
  displayName?: string;
  hasVoiceFeatures: boolean;
  hasAICloning: boolean;
}

export const signUp = async (email: string, password: string, plan: string) => {
  console.log('Auth not yet implemented - Supabase integration coming soon');
  throw new Error('Authentication not yet configured. Please check back soon!');
};

export const signIn = async (email: string, password: string) => {
  console.log('Auth not yet implemented - Supabase integration coming soon');
  throw new Error('Authentication not yet configured. Please check back soon!');
};

export const logOut = async () => {
  console.log('Auth not yet implemented - Supabase integration coming soon');
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  console.log('Auth not yet implemented - Supabase integration coming soon');
  return null;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  // Return null user initially
  callback(null);
  // Return unsubscribe function
  return () => {};
};
