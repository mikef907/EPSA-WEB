import { createContext } from 'react';
import { IS_SERVER } from '../constants';

export type ThemeCtx = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeCtx>({
  state: IS_SERVER ? false : localStorage.getItem('dark-theme') === 'true',
  setState: () => false,
});
