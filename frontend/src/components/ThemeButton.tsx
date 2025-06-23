import { useEffect, useState } from "react";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const ThemeButton: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof localStorage !== "undefined" && localStorage.theme) {
      return localStorage.theme as "light" | "dark";
    }
    return getSystemTheme();
  });

  // Detectar cambios en el sistema
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const systemChange = () => {
      if (!localStorage.theme) {
        setTheme(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", systemChange);
    return () => media.removeEventListener("change", systemChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="absolute top-0 left-0 m-4 p-4">

    
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      {theme === "dark" ? "🌙 Oscuro" : "☀️ Claro"}
    </button>
    </div>
  );
};

export default ThemeButton;
