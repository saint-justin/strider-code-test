import { createContext, useMemo, useState, useContext } from 'react';
import { PaletteMode, Theme, createTheme } from '@mui/material';

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

interface ThemeContextProps {
  mode: string;
  theme: Theme;
  toggle: () => void;
}

/**
 * Create the initial hook with a mode, a toggle, and a theme.
 * @returns { string }      mode   - The current theme (dark or light)
 * @returns { Theme }       theme  - The current theme object for the MUI ThemeProvider to consume
 * @returns { () => void }  toggle - Helper function to toggle the theme between dark and light
 */
const useColorTheme = (): ThemeContextProps => {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const toggle = () => setMode((prevMode: PaletteMode) => prevMode === 'light' ? 'dark' :  'light');
  const modifiedTheme = useMemo(() => createTheme({ palette: { mode } }), [mode])
  return { theme: modifiedTheme, mode, toggle };
}

/**
 * Instantiated context to pass to ThemeContextProvider
 */
const ThemeContext = createContext<ThemeContextProps>({
  mode: 'dark',
  toggle: () => {},
  theme: createTheme(),
});

/**
 * @param { React.ReactNode } children - The children to render inside the ThemeContextProvider
 * @returns { React.FC }               - Externally accessible ThemeContextProvider wrapper
 */
export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const theme = useColorTheme();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

/**
 * @returns { ThemeContextProps } - Externally accessible ThemeContext instance
 */
export const useThemeContext = () => {
  return useContext(ThemeContext);
}