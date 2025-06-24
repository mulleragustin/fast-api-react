import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const ThemeButton: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "auto";
  });

  // Escuchar cambios del sistema si estamos en modo auto
  useEffect(() => {
    if (theme !== "auto") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const systemChange = () => {
      const systemTheme = getSystemTheme();
      document.documentElement.setAttribute("data-theme", systemTheme);
    };

    media.addEventListener("change", systemChange);
    return () => media.removeEventListener("change", systemChange);
  }, [theme]);

  // Aplicar el tema (auto o manual)
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "auto") {
      localStorage.removeItem("theme");
      const systemTheme = getSystemTheme();
      root.setAttribute("data-theme", systemTheme);
    } else {
      localStorage.setItem("theme", theme);
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme(prev =>
      prev === "light" ? "dark" : prev === "dark" ? "auto" : "light"
    );
  };

  const label = {
    light: "☀️ Claro",
    dark: "🌙 Oscuro",
    auto: "🖥️ Automático",
  };

  return (
    <div className="absolute top-0 left-0 m-4 p-4">
      <button
        onClick={cycleTheme}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 transition-colors"
      >
        {label[theme]}
      </button>
    </div>
  );
};

export default ThemeButton;
