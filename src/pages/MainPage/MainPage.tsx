import { Outlet } from "react-router";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher/ui/ThemeSwitcher";

const MainPage = () => {
  return (
    <div>
      <ThemeSwitcher />
      MainPage
      <Outlet />
    </div>
  );
};

export default MainPage;
