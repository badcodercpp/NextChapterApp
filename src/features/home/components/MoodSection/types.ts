export interface Mood {
  id: string;
  emoji: string;
  title: string;
}

export interface MoodSectionProps {
  moods: Mood[];
  selectedMood?: string;
  onSelectMood: (id: string) => void;
  onEdit?: () => void;
}
