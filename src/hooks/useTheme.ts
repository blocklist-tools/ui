import {useEffect, useState} from "react";

export enum Theme {
  LIGHT = 'lightTheme',
  DARK = 'darkTheme'
}

const LOCAL_STORAGE_KEY = 'preferred-theme';

export function useTheme(): [Theme, (arg0: Theme) => void] {
  let initialTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme ?? null;
  if (!initialTheme) {
    initialTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? Theme.LIGHT : Theme.DARK;
  }
  const [state, updateTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(Theme.DARK, Theme.LIGHT);
    root.classList.add(state);
  }, [state]);

  function dispatch(newTheme: Theme): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    updateTheme(newTheme);
  }

  return [state, dispatch];
}
