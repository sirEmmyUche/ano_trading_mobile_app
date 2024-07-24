// hooks.tsx
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState<T>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>();

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          const storedValue = localStorage.getItem(key);
          setState(storedValue ? JSON.parse(storedValue) : null);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value ? JSON.parse(value) : null);
      });
    }
  }, [key]);

  const setValue = React.useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, value ? JSON.stringify(value) : null);
    },
    [key]
  );

  return [state, setValue];
}

