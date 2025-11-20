import { useThemeContext } from "../ThemeContext/ThemeContext";

export const useThemeStyles = () => {
  const { isDarkTheme } = useThemeContext(); // Используем переименованный хук

  return {
    backgroundColor: isDarkTheme ? "var(--bg-secondary)" : "#FFFFFF",
    textColor: isDarkTheme ? "var(--text-primary)" : "#000000",
    borderColor: isDarkTheme
      ? "var(--border-color)"
      : "rgba(148, 166, 190, 0.4)",
  };
};
