import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16 bg-gray-100 h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
