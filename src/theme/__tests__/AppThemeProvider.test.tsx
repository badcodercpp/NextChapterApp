import React from 'react';
import { Modal, StatusBar } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { Uniwind } from 'uniwind';
import { getCombinedSlices } from '@/state/slices';
import { setThemePreference } from '@/state/slices/local/preferences';
import { SettingsScreen } from '@/features/Settings/screens/SettingsScreen';
import { ThemeSheet } from '@/features/Settings/components/ThemeSheet';
import { AppThemeProvider } from '../AppThemeProvider';
import type { AppTheme } from '@/features/Settings/constants';

jest.mock('uniwind', () => {
  const ReactModule = jest.requireActual<typeof import('react')>('react');
  let theme = 'ocean';
  const listeners = new Set<() => void>();
  return {
    Uniwind: {
      setTheme: jest.fn((value: string) => {
        theme = value;
        listeners.forEach(listener => listener());
      }),
    },
    useUniwind: () => ({
      theme: ReactModule.useSyncExternalStore(
        (listener: () => void) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        () => theme,
      ),
    }),
  };
});
jest.mock('@/components', () => {
  const { View, Text, Pressable } = jest.requireActual('react-native');
  return {
    AppAuthenticatedLayout: View,
    AppCard: View,
    AppIcon: View,
    AppPressable: Pressable,
    AppText: Text,
  };
});
jest.mock('@/components/foundation/AppText', () => ({
  AppText: jest.requireActual('react-native').Text,
}));
jest.mock('lucide-react-native', () => ({
  ChevronRight: 'ChevronRight',
  Globe: 'Globe',
  Moon: 'Moon',
  Check: 'Check',
  X: 'X',
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 24, left: 0, right: 0 }),
}));

const makeStore = () =>
  configureStore({ reducer: { app: getCombinedSlices() } });
let screen: ReactTestRenderer;
afterEach(() => {
  act(() => screen?.unmount());
  jest.clearAllMocks();
});

beforeEach(() => {
  Uniwind.setTheme('ocean');
  jest.clearAllMocks();
});

test('defaults to dark instead of forcing ocean and displays that choice in Settings', () => {
  const store = makeStore();
  act(() => {
    screen = create(
      <Provider store={store}>
        <AppThemeProvider>
          <SettingsScreen />
        </AppThemeProvider>
      </Provider>,
    );
  });
  expect(Uniwind.setTheme).toHaveBeenLastCalledWith('dark');
  act(() =>
    screen.root
      .findByProps({ accessibilityLabel: 'Choose theme' })
      .props.onPress(),
  );
  expect(screen.root.findByType(ThemeSheet).props.selected).toBe('dark');
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Dark' }).props
      .accessibilityState.checked,
  ).toBe(true);
});

test('keeps dark by default until the user explicitly changes the preference', () => {
  const store = makeStore();
  expect(store.getState().app.preferences.theme).toBe('dark');
  store.dispatch({ type: 'app/unrelated-action' });
  expect(store.getState().app.preferences.theme).toBe('dark');
  store.dispatch(setThemePreference('light'));
  expect(store.getState().app.preferences.theme).toBe('light');
  store.dispatch({ type: 'app/unrelated-action' });
  expect(store.getState().app.preferences.theme).toBe('light');
});

test.each(['light', 'dark', 'ocean'] as const)(
  'Settings selection applies %s globally, keeps the status bar in sync, and survives Settings remount',
  theme => {
    const store = makeStore();
    const render = (showSettings: boolean) => (
      <Provider store={store}>
        <AppThemeProvider>
          {showSettings && <SettingsScreen />}
        </AppThemeProvider>
      </Provider>
    );
    act(() => {
      screen = create(render(true));
    });
    act(() =>
      screen.root
        .findByProps({ accessibilityLabel: 'Choose theme' })
        .props.onPress(),
    );
    const labels = { light: 'Light', dark: 'Dark', ocean: 'Ocean' };
    act(() =>
      screen.root
        .findByProps({ accessibilityLabel: labels[theme] })
        .props.onPress(),
    );
    expect(screen.root.findAllByType(ThemeSheet)).toHaveLength(0);
    expect(store.getState().app.preferences.theme).toBe(theme);
    expect(Uniwind.setTheme).toHaveBeenLastCalledWith(theme);
    expect(screen.root.findByType(StatusBar).props.barStyle).toBe(
      theme === 'light' ? 'dark-content' : 'light-content',
    );
    act(() => screen.update(render(false)));
    act(() => screen.update(render(true)));
    act(() =>
      screen.root
        .findByProps({ accessibilityLabel: 'Choose theme' })
        .props.onPress(),
    );
    expect(screen.root.findByType(ThemeSheet).props.selected).toBe(theme);
  },
);

test('theme chooser is a modal and dismisses without changing the saved selection', () => {
  const store = makeStore();
  act(() => {
    screen = create(
      <Provider store={store}>
        <AppThemeProvider>
          <SettingsScreen />
        </AppThemeProvider>
      </Provider>,
    );
  });
  const open = () => {
    act(() =>
      screen.root
        .findByProps({ accessibilityLabel: 'Choose theme' })
        .props.onPress(),
    );
  };
  open();
  expect(screen.root.findByType(Modal).props.transparent).toBe(true);
  act(() => screen.root.findByType(Modal).props.onRequestClose());
  expect(screen.root.findAllByType(ThemeSheet)).toHaveLength(0);
  open();
  act(() =>
    screen.root
      .findByProps({ accessibilityLabel: 'Dismiss theme chooser' })
      .props.onPress(),
  );
  expect(store.getState().app.preferences.theme).toBe('dark');
  expect(screen.root.findAllByType(ThemeSheet)).toHaveLength(0);
});

test('keeps the saved choice authoritative if the runtime theme is reset', () => {
  const store = makeStore();
  store.dispatch(setThemePreference('light'));
  act(() => {
    screen = create(
      <Provider store={store}>
        <AppThemeProvider>
          <SettingsScreen />
        </AppThemeProvider>
      </Provider>,
    );
  });
  act(() => Uniwind.setTheme('dark'));
  expect(Uniwind.setTheme).toHaveBeenLastCalledWith('light');
  expect(store.getState().app.preferences.theme).toBe('light');
  expect(screen.root.findByType(StatusBar).props.barStyle).toBe('dark-content');
});

test.each(['light', 'dark', 'ocean'] as const)(
  'restores the saved %s preference after a persistence round trip',
  async (theme: AppTheme) => {
    const records = new Map<string, string>();
    const storage = {
      getItem: async (key: string) => records.get(key) ?? null,
      setItem: async (key: string, value: string) => {
        records.set(key, value);
      },
      removeItem: async (key: string) => {
        records.delete(key);
      },
    };
    const makePersistedStore = () =>
      configureStore({
        reducer: {
          app: persistReducer(
            { key: 'root', storage, timeout: 0 },
            getCombinedSlices(),
          ),
        },
        middleware: getDefaultMiddleware =>
          getDefaultMiddleware({ serializableCheck: false }),
      });
    const first = makePersistedStore();
    const persist = (store: ReturnType<typeof makePersistedStore>) =>
      new Promise<ReturnType<typeof persistStore>>(resolve => {
        const persistor = persistStore(store, undefined, () =>
          resolve(persistor),
        );
      });
    const firstPersistor = await persist(first);
    first.dispatch(setThemePreference(theme));
    await firstPersistor.flush();
    firstPersistor.pause();
    const restored = makePersistedStore();
    const restoredPersistor = await persist(restored);
    expect(restored.getState().app.preferences.theme).toBe(theme);
    Uniwind.setTheme(theme === 'dark' ? 'light' : 'dark');
    jest.clearAllMocks();
    act(() => {
      screen = create(
        <Provider store={restored}>
          <AppThemeProvider>
            <SettingsScreen />
          </AppThemeProvider>
        </Provider>,
      );
    });
    expect(Uniwind.setTheme).toHaveBeenLastCalledWith(theme);
    await restoredPersistor.flush();
    restoredPersistor.pause();
  },
);
