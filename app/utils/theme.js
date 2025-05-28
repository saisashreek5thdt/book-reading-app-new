import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import colors from "./colors";

const themes = {
  light: {
    background: colors.lightBG,
    text: colors.PRIMARY,
    formBG: colors.formLightBG,
    formInput: colors.formInputLight,
    formTitle: colors.formLightTitle,
    btnBG: colors.BLACK,
    bookTitleHead: colors.PRIMARY,
    bookTitleBtn: colors.BLACK,
    tabBG: colors.tabLightBG,
    tabActive: colors.tabActiveLight,
    tabInActive: colors.tabInActiveLight
  },
  dark: {
    background: colors.darkBG,
    text: colors.WHITE,
    formBG: colors.formDarkBG,
    formInput: colors.formInputDark,
    formTitle: colors.formDarkTitle,
    btnBG: colors.WHITE,
    bookTitleHead: colors.WHITE,
    bookTitleBtn: colors.WHITE,
    tabBG: colors.tabDarkBG,
    tabActive: colors.tabActiveDark,
    tabInActive: colors.tabInActiveDark
  },
};

const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {},
  currentTheme: themes.light,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState("system");
  const [loaded, setLoaded] = useState(false);

  const loadTheme = async () => {
    const stored = await AsyncStorage.getItem("appTheme");
    if (stored) {
      setThemeState(stored);
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
  };

  const resolveTheme = theme === "system" ? systemScheme ?? "light" : theme;

  const currentTheme = themes[resolveTheme];

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
