import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // ИСПРАВЛЕНО: используем контекст напрямую

export const useThemeStyles = () => {
  // ✅ ИСПРАВЛЕНО: используем ThemeContext напрямую
  const { isDarkTheme } = useContext(ThemeContext);

  return {
    backgroundColor: isDarkTheme ? "var(--bg-secondary)" : "#FFFFFF",
    textColor: isDarkTheme ? "var(--text-primary)" : "#000000",
    borderColor: isDarkTheme
      ? "var(--border-color)"
      : "rgba(148, 166, 190, 0.4)",
    isDarkTheme, // ✅ ДОБАВЛЕНО: возвращаем состояние темы
  };
};

// ✅ ДОБАВЛЕНО: альтернативный хук для удобства
export const useTheme = () => {
  return useContext(ThemeContext);
};
