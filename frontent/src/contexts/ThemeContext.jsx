import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { THEME_COLORS } from "../../utils/Constant";

const themeContaxt = createContext();
export const useTheme = () => useContext(themeContaxt);

const ThemeContext = ({ children }) => {
  const ctheme = JSON.parse(localStorage.getItem("filmspotthema")) || "dark";
  const [theme, setTheme] = useState(ctheme);

  useEffect(() => {
    localStorage.setItem("filmspotthema", JSON.stringify(theme));
  }, [theme]);

  const activeTheme = useMemo(() => {
    console.log("Searching for theme string:", theme);
    return THEME_COLORS.find((t) => t.themeName === theme) || THEME_COLORS;
  }, [theme]);

  console.log("active theme is", activeTheme);

  const value = {
    theme: activeTheme,
    setTheme: setTheme,
    themeName: theme,
  };

  return (
    <themeContaxt.Provider value={value}>{children}</themeContaxt.Provider>
  );
};

export default ThemeContext;
