import { useTheme } from "./ThemeToggle";
import { LucideMoon, LucideSun } from "lucide-react";

export default function ThemeButton() {
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      onClick={handleTheme}
      className="cursor-pointer flex gap-2 items-center md:justify-start justify-center px-4 py-2 rounded-lg  p-2 dark:text-white"
    >
      {theme === "dark" ? <LucideMoon /> : <LucideSun />}
      <p className="lg:text-base md:text-sm text-xs sm:flex hidden text-muted-foreground">
        {theme === "dark" ? "DarkMode" : "LightMode"}
      </p>
    </div>
  );
}
