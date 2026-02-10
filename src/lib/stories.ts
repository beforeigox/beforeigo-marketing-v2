// Placeholder stories module - will be replaced with Supabase
export interface Story {
  id: string;
  userId: string;
  title: string;
  content: string;
  promptId: string;
  promptTitle: string;
  promptQuestion: string;
  category: string;
  status: 'draft' | 'complete';
  wordCount: number;
  audioUrl?: string;
  transcription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryPrompt {
  id: string;
  title: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  order: number;
}

// Mock data for story prompts
const mockPrompts: StoryPrompt[] = [
  {
    id: '1',
    title: 'Early Memories',
    question: 'What is your earliest childhood memory?',
    category: 'childhood',
    difficulty: 'easy',
    tags: ['childhood', 'memories'],
    order: 1
  },
  {
    id: '2',
    title: 'Family Traditions',
    question: 'What family traditions were most important to you growing up?',
    category: 'family',
    difficulty: 'easy',
    tags: ['family', 'traditions'],
    order: 2
  },
  {
    id: '3',
    title: 'Life Lessons',
    question: 'What is the most valuable lesson life has taught you?',
    category: 'wisdom',
    difficulty: 'medium',
    tags: ['wisdom', 'lessons'],
    order: 3
  }
];

// Story CRUD operations
export const createStory = async (storyData: Omit<Story, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  console.log('Stories not yet implemented - Supabase integration coming soon');
  throw new Error('Story creation not yet configured. Please check back soon!');
};

export const updateStory = async (storyId: string, updates: Partial<Story>): Promise<void> => {
  console.log('Stories not yet implemented - Supabase integration coming soon');
  throw new Error('Story update not yet configured. Please check back soon!');
};

export const deleteStory = async (storyId: string): Promise<void> => {
  console.log('Stories not yet implemented - Supabase integration coming soon');
  throw new Error('Story deletion not yet configured. Please check back soon!');
};

export const getUserStories = async (userId: string): Promise<Story[]> => {
  console.log('Stories not yet implemented - Supabase integration coming soon');
  return [];
};

export const getStory = async (storyId: string): Promise<Story | null> => {
  console.log('Stories not yet implemented - Supabase integration coming soon');
  return null;
};

// Story prompts
export const getStoryPrompts = async (): Promise<StoryPrompt[]> => {
  // Return mock data for now
  return mockPrompts;
};

export const getPromptsByCategory = async (category: string): Promise<StoryPrompt[]> => {
  // Return filtered mock data
  return mockPrompts.filter(prompt => prompt.category === category);
};

// Utility functions
export const calculateWordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const getStoryProgress = (stories: Story[]): { completed: number; total: number; percentage: number } => {
  const completed = stories.filter(story => story.status === 'complete').length;
  const total = stories.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
};
