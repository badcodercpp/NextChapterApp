// SceneLayout.ts

export const SceneLayout = {
  // Canvas
  width: 390,
  height: 300,

  // Sky
  skyHeight: 170,

  // Horizon
  horizonY: 160,

  // Landscape layers
  backLandscapeY: 170,
  middleLandscapeY: 205,
  frontLandscapeY: 235,

  // Water
  lakeY: 205,

  // Foreground
  foregroundY: 260,

  // Celestial objects
  sun: {
    x: 285,
    y: 70,
    radius: 22,
    glowRadius: 70,
  },

  moon: {
    x: 285,
    y: 70,
    radius: 18,
    glowRadius: 40,
  },

  // Clouds
  clouds: [
    {
      x: 70,
      y: 55,
      scale: 0.9,
      opacity: 0.7,
    },
    {
      x: 220,
      y: 40,
      scale: 1.3,
      opacity: 0.55,
    },
    {
      x: 330,
      y: 85,
      scale: 0.75,
      opacity: 0.4,
    },
  ],

  // Birds
  birds: [
    {
      x: 70,
      y: 92,
      scale: 1,
    },
    {
      x: 145,
      y: 112,
      scale: 0.8,
    },
    {
      x: 245,
      y: 85,
      scale: 0.6,
    },
  ],
  stars: [
    { x: 35, y: 30, r: 1.4, opacity: 0.9 },
    { x: 75, y: 55, r: 1.2, opacity: 0.7 },
    { x: 120, y: 22, r: 1.8, opacity: 1 },
    { x: 165, y: 70, r: 1.1, opacity: 0.6 },
    { x: 205, y: 38, r: 1.5, opacity: 0.85 },
    { x: 250, y: 62, r: 1.3, opacity: 0.75 },
    { x: 300, y: 28, r: 1.7, opacity: 0.95 },
    { x: 340, y: 48, r: 1.2, opacity: 0.7 },
    { x: 365, y: 18, r: 1.6, opacity: 0.9 },
  ],
} as const;
