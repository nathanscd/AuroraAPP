export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  text: string;
  imageUrl?: string;
  perspective?: "man" | "woman" | "both";
}

export interface Flower {
  id: string;
  name: string;
  date: string;
  description: string;
  color: string;
  plantedBy?: "man" | "woman" | "both";
}

export interface Place {
  id: string;
  name: string;
  date: string;
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  visitedBy?: "man" | "woman" | "both";
}

export interface Reason {
  id: string;
  number: number;
  title: string;
  description: string;
  category: string;
  gender?: "man" | "woman" | "both";
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  perspective?: "man" | "woman" | "both";
  iconName?: string;
}
