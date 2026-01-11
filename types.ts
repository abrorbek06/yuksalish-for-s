
export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  color: string;
}

export enum StoryMode {
  POETIC = 'poetic',
  PHILOSOPHICAL = 'philosophical',
  REALISTIC = 'realistic'
}
