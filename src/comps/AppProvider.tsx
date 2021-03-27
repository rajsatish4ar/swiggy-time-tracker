import React, {useState, useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContextType} from '../types/Configs';
import {ScreenFlow, ThemeType} from '../utils/Enums';
import {DARK_COLORS, LIGHT_COLORS} from '../utils/Colors';

const defaultValue: AppContextType = {
  dark: true,
  screen: ScreenFlow.Splash,
};
const AppContext = React.createContext<AppContextType>(defaultValue);
export default AppContext;

export function AppProvider(props) {
  const [dark, setDark] = useState<boolean>(false);
  const [screen, setScreen] = useState<ScreenFlow>(ScreenFlow.Splash);
  useLayoutEffect(() => {
    (async () => {
      const theme: string = await AsyncStorage.getItem('@theme');
      if (theme == ThemeType.DARK) return setDark(false);
      setDark(false);
    })();
  }, []);
  React.useEffect(() => {
    if (dark) {
      StatusBar.setBackgroundColor(DARK_COLORS.background);
      StatusBar.setBarStyle('light-content');
      return;
    }
    StatusBar.setBackgroundColor(LIGHT_COLORS.background);
    StatusBar.setBarStyle('dark-content');
  }, [dark]);

  const toggleTheme = async () => {
    setDark(!dark);
    const theme: string = dark ? ThemeType.LIGHT : ThemeType.DARK;
    await AsyncStorage.setItem('@theme', theme);
  };

  const setScreenFlow = (flow: ScreenFlow) => setScreen(flow);
  return (
    <AppContext.Provider value={{dark, screen, toggleTheme, setScreenFlow}}>
      {props.children}
    </AppContext.Provider>
  );
}
