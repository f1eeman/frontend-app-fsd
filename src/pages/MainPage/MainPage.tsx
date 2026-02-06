import { Navbar } from "@/widgets/Navbar";
import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/Sidebar";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <div className={"page-wrapper"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
