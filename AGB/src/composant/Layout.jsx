import Nav from "../Dashboard/Nav.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;