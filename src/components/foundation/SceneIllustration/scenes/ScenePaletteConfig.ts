import { ScenePalette } from './types';
import { Theme } from '@/theme';
import { UserMood } from '@/constants';

const c = Theme.colors;

export const ScenePaletteConfig: Record<UserMood, ScenePalette> = {
  [UserMood.Happy]: {
    scene: 'sunrise',

    skyTop: c.warningSurface,
    skyBottom: c.background,

    light: c.warning,

    mountainBack: '#CFE7D7',
    mountainMiddle: '#97C7A4',
    mountainFront: '#5E8E6B',

    water: '#AEE6E2',

    foreground: '#4C7556',

    highlight: '#FFD76A',

    atmosphere: '#FFF6DD',

    cloud: c.surface,

    bird: c.textSecondary,
  },

  [UserMood.Grateful]: {
    scene: 'goldenField',

    skyTop: '#FFF0C6',
    skyBottom: '#FFF9ED',

    light: '#F5BE4B',

    mountainBack: '#E7DCB1',
    mountainMiddle: '#C7BE72',
    mountainFront: '#8D9145',

    water: '#E5D79C',

    foreground: '#7C833A',

    highlight: '#E8A91D',

    atmosphere: '#FFF7E6',

    cloud: c.surface,

    bird: '#7A6744',
  },

  [UserMood.Calm]: {
    scene: 'lake',

    skyTop: '#DFF5F6',
    skyBottom: '#F7FCFC',

    light: '#C5E8EA',

    mountainBack: '#D0E4E2',
    mountainMiddle: '#9DBEBA',
    mountainFront: '#678985',

    water: '#93D9D1',

    foreground: '#557572',

    highlight: '#7CC9BF',

    atmosphere: '#ECF8F8',

    cloud: c.surface,

    bird: '#627472',
  },

  [UserMood.Hopeful]: {
    scene: 'forest',

    skyTop: '#FCE9C8',
    skyBottom: '#FFFDF8',

    light: '#F6C25D',

    mountainBack: '#D8E7C5',
    mountainMiddle: '#A9CF8B',
    mountainFront: '#5C9556',

    water: '#C4ECD8',

    foreground: '#447547',

    highlight: '#8DC63F',

    atmosphere: '#F9F8E9',

    cloud: c.surface,

    bird: '#5A6F58',
  },

  [UserMood.Sad]: {
    scene: 'rain',

    skyTop: '#D7E4EE',
    skyBottom: '#EEF4F8',

    light: '#C4D3DF',

    mountainBack: '#CBD8E2',
    mountainMiddle: '#8DA6B8',
    mountainFront: '#647B8A',

    water: '#91AEC4',

    foreground: '#536877',

    highlight: '#709CC4',

    atmosphere: '#E6EFF5',

    cloud: '#F6F8FA',

    bird: '#6C7A88',
  },

  [UserMood.Lonely]: {
    scene: 'moon',

    skyTop: '#394867',
    skyBottom: '#1A2336',

    light: '#F7F0C6',

    mountainBack: '#7382A2',
    mountainMiddle: '#55627E',
    mountainFront: '#364259',

    water: '#31455F',

    foreground: '#243245',

    highlight: '#EADFA5',

    atmosphere: '#243148',

    cloud: '#8E9AB5',

    bird: '#AAB4C8',
  },

  [UserMood.Anxious]: {
    scene: 'mist',

    skyTop: '#E9EEF1',
    skyBottom: '#F8F9FA',

    light: '#D6DBDE',

    mountainBack: '#D5DBDE',
    mountainMiddle: '#AAB4BA',
    mountainFront: '#7E8A92',

    water: '#C0CCD2',

    foreground: '#6C757D',

    highlight: '#A8B4B8',

    atmosphere: '#EEF2F3',

    cloud: '#FFFFFF',

    bird: '#727C84',
  },

  [UserMood.Angry]: {
    scene: 'storm',

    skyTop: '#5D4F83',
    skyBottom: '#272238',

    light: '#F56C55',

    mountainBack: '#867D98',
    mountainMiddle: '#645C75',
    mountainFront: '#3F3948',

    water: '#514B5E',

    foreground: '#2F2A38',

    highlight: '#FF6B57',

    atmosphere: '#403A4B',

    cloud: '#AAA4B8',

    bird: '#DDD8E7',
  },

  [UserMood.Neutral]: {
    scene: 'hills',

    skyTop: c.surface,
    skyBottom: c.background,

    light: '#E5E8E4',

    mountainBack: '#E2E5E2',
    mountainMiddle: '#C7CDC8',
    mountainFront: '#99A39C',

    water: '#DCE5DF',

    foreground: '#7F8C83',

    highlight: '#ADB7AF',

    atmosphere: '#F8F9F8',

    cloud: c.surface,

    bird: c.textSecondary,
  },
  [UserMood.Confident]: {
    scene: 'hills',

    skyTop: c.surface,
    skyBottom: c.background,

    light: '#E5E8E4',

    mountainBack: '#E2E5E2',
    mountainMiddle: '#C7CDC8',
    mountainFront: '#99A39C',

    water: '#DCE5DF',

    foreground: '#7F8C83',

    highlight: '#ADB7AF',

    atmosphere: '#F8F9F8',

    cloud: c.surface,

    bird: c.textSecondary,
  },
  [UserMood.Heartbroken]: {
    scene: 'hills',

    skyTop: c.surface,
    skyBottom: c.background,

    light: '#E5E8E4',

    mountainBack: '#E2E5E2',
    mountainMiddle: '#C7CDC8',
    mountainFront: '#99A39C',

    water: '#DCE5DF',

    foreground: '#7F8C83',

    highlight: '#ADB7AF',

    atmosphere: '#F8F9F8',

    cloud: c.surface,

    bird: c.textSecondary,
  },
};
