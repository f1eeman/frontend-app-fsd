import { useTheme } from "@/app/theme";
import ThemeDarkIcon from "@/shared/assets/icons/theme-dark.svg";
import ThemeLightIcon from "@/shared/assets/icons/theme-light.svg";
import { Button } from "@/shared/ui/Button/Button";
import type { FC } from "react";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className = "" }) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <Button theme={"clear"} onClick={toggleTheme} className={className}>
      {theme === "app_theme_dark" && <ThemeDarkIcon />}
      {theme === "app_theme_light" && <ThemeLightIcon />}
    </Button>
  );
};
