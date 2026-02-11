import { Outlet } from "react-router-dom";
import Deshboard from "./Deshboard";

const DeshBoardLayout = () => {
  return (
    <>
      <Outlet />
      <Deshboard />
    </>
  );
};

export default DeshBoardLayout;
