import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./menu.css";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

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

  function addHandler() {
    if (location.pathname === "/menu/notes") {
      navigate("/menu/notes/addnote");
    }
    if (location.pathname === "/menu/todo") {
      navigate("/menu/todo/addtodo");
    }
  }

  return (
    <>
      <div className="menu-container">
        <header>
          <input
            className="search-bar"
            type="text"
            placeholder="searchHere.."
            value={searchInput}
            onChange={handleSearchChange}
          />

          <AddCircleRoundedIcon
            className="add-notes__icon"
            onClick={addHandler}
          />
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
        </ul>
        <div className="menu-content">
          <Outlet context={searchInput} />
        </div>
      </div>
    </>
  );
}
