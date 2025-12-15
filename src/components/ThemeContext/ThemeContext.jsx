import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Синхронно загружаем тему из localStorage
    const savedTheme = localStorage.getItem("theme");
    let initialTheme = false;
    
    if (savedTheme) {
      initialTheme = savedTheme === "dark";
    } else if (window.matchMedia) {
      initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    
    setIsDarkTheme(initialTheme);
    
    // Синхронно применяем тему к document
    if (initialTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    
    // Устанавливаем флаг загрузки в следующем цикле событий
    requestAnimationFrame(() => {
      setIsThemeLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isThemeLoaded) return;

    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    
    if (isDarkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkTheme, isThemeLoaded]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkTheme, 
      toggleTheme,
      isThemeLoaded 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};