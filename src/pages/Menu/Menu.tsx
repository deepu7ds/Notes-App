import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "./menu.css";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function Menu() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = () => {
      // Show a confirmation dialog
      const confirmClose = window.confirm("Are you sure you want to leave?");
      if (confirmClose) {
        navigate("/");
      }
    };

    window.history.pushState({}, "", window.location.pathname);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, []);

  return (
    <>
      <div className="menu-container">
        <header>
          <input
            className="search-bar"
            type="text"
            placeholder="searchHere.."
          />
          <Link to="/menu/notes/addnote">
            <AddCircleRoundedIcon className="add-notes__icon" />
          </Link>
        </header>
        <ul>
          {/* use navlink here to show which section i am currently at by changing background color */}
          {/* by default active class is active */}
          <li>
            <NavLink to="/menu/notes">Notes</NavLink>
          </li>
          <li>
            <NavLink to="/menu/todo">To Do</NavLink>
          </li>
          <li>
            <NavLink to="/menu/blog">Blog</NavLink>
          </li>
        </ul>
        <div className="menu-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
