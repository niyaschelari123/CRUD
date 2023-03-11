import { Outlet, Link ,useLocation} from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const location=useLocation();
  console.log(location);

  return (
    <>
      <nav>
        <ul>
          <li id="eda">
            <Link to="/">Home</Link>
          </li>
          <li >
            <Link to="/addContact">Add Contact</Link>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;