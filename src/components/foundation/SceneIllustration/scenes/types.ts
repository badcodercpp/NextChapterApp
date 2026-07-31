export type SceneVariant =
  | 'sunrise'
  | 'goldenField'
  | 'lake'
  | 'forest'
  | 'rain'
  | 'moon'
  | 'storm'
  | 'mist'
  | 'hills';

export interface ScenePalette {
  scene: SceneVariant;

  skyTop: string;
  skyBottom: string;

  light: string;

  mountainBack: string;
  mountainMiddle: string;
  mountainFront: string;

  water?: string;

  foreground: string;

  highlight: string;

  atmosphere: string;

  cloud: string;

  bird: string;
}
