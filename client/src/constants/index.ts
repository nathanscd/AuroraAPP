// Routes
export const ROUTES = {
  HOME: "/",
  TIMELINE: "/timeline",
  REASONS: "/reasons",
  STORY: "/story",
  PLACES: "/places",
  GARDEN: "/garden",
} as const;

// Color Palette - Romantic Theme
export const COLORS = {
  cream: "#FAF8F3",
  white: "#FFFFFF",
  pinkLight: "#FDE8E8",
  redSoft: "#E8A8A8",
  goldDiscreet: "#D4AF8F",
  darkText: "#2C2C2C",
  grayLight: "#E8E8E8",
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// Easing Functions
export const EASING = {
  easeOut: "cubic-bezier(0.23, 1, 0.32, 1)",
  easeInOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  easeIn: "cubic-bezier(0.42, 0, 1, 1)",
} as const;

// App Constants
export const APP_NAME = "Memórias Especiais";
export const MAIN_TAGLINE = "Uma pequena coleção das memórias mais especiais que construímos juntos.";
export const RELATIONSHIP_START_DATE = new Date("2020-06-15");
