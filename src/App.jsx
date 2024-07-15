import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import HomeContent from "./pages/HomeContent/HomeContent.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import Notes from "./pages/Notes/Notes.jsx";
import ToDo from "./pages/ToDo/ToDo.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile/Profile.jsx";
import AddNotes from "./pages/AddNotes/AddNotes.jsx";
import AddToDo from "./pages/AddToDo/AddToDo.jsx";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function App() {
  const [token, setToken] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light-theme"
  );

  const location = useLocation();
  const navigate = useNavigate();

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  // condition to make token false when user went to home page
  useEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("cachedNotes");
      sessionStorage.removeItem("cachedTodos");
      setToken(false);
    }
  }, [location]);

  // used so that when page is reloaded the the session won't expire because token was stored in local storage
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const data = JSON.parse(token);
      setToken(data);
    }
  }, []);

  //handle profile click
  function handleProfileClick(e) {
    e.preventDefault();
    setOpenProfile((prevOpenProfile) => {
      const newOpenProfile = !prevOpenProfile;
      if (newOpenProfile) {
        navigate("/profile");
      } else {
        navigate("/menu/notes");
      }
      return newOpenProfile;
    });
  }

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme); // Optional: Save to local storage
  }, [theme]);

  // Step 3: Modify toggleTheme to update the theme state
  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  }

  return (
    <>
      <div className="app-container">
        <div className="navbar">
          <div className="theme-regulator">
            <h1 onClick={toggleTheme}>Notes</h1>
            {theme == "light-theme" ? (
              <LightModeIcon style={{ color: "#ff9900" }} />
            ) : (
              <DarkModeIcon style={{ color: "white" }} />
            )}
          </div>
          {token && (
            <h3 className="user-name" onClick={handleProfileClick}>
              Hi, {token.user.user_metadata.name}
            </h3>
          )}
        </div>
        <HomeContent />
        {/* TODO : write condition when user is not logged in not to render any thing and return another page to login first  */}
        <Routes>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="login" element={<Login setToken={setToken} />}></Route>
          <Route path="profile" element={<Profile />}></Route>

          <Route path="menu" element={<Menu />}>
            <Route path="/menu/notes" element={<Notes />}>
              <Route path="/menu/notes/addnote" element={<AddNotes />}></Route>
            </Route>
            <Route path="todo" element={<ToDo />}>
              <Route path="/menu/todo/addtodo" element={<AddToDo />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
