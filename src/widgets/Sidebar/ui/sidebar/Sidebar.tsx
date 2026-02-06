import { useTranslation } from "react-i18next";
import { type FC, useCallback, useState } from "react";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
import { LangSwitcher } from "@/widgets/LangSwticher";
import { Button } from "@/shared/ui/Button/Button";
import { AppLink, AppLinkTheme } from "@/shared/ui/Link/Link";
import { classNames } from "@/shared/lib/classNames/classNames";
import { routesPaths } from "@/shared/config/routes";
import MainIcon from "shared/assets/icons/home.svg";
import AboutIcon from "shared/assets/icons/list.svg";
import * as cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC = ({ className = "" }: SidebarProps) => {
  const { t } = useTranslation("common");
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
  }, []);

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        square
        theme={"background-inverted"}
        onClick={toggleCollapsed}
        data-testid="sidebar-toggle"
        className={cls.collapseBtn}
        size={"size-l"}
      >
        {`${collapsed ? ">" : "<"}`}
      </Button>
      <div className={cls.navLinks}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={cls.navLink}
          to={routesPaths.root.path}
        >
          <MainIcon />
          <span className={cls.navLinkText}> {t("Главная страница")}</span>
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={cls.navLink}
          to={routesPaths.about.path}
        >
          <AboutIcon />
          <span className={cls.navLinkText}>{t("О сайте")}</span>
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short />
      </div>
    </div>
  );
};
