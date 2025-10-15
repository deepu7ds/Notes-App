import { useNavigate } from "react-router";
import "./profile.css";
import { useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { getNotes, getTodos } from "../../utils/localStorage.js";

export default function Profile() {
  const navigate = useNavigate();
  const [notesLength, setNotesLength] = useState(0);
  const [todosLength, setTodosLength] = useState(0);

  useEffect(() => {
    const notes = getNotes();
    setNotesLength(notes.length);
  }, []);

  useEffect(() => {
    const todos = getTodos();
    setTodosLength(todos.length);
  }, []);

  function closeHandler(e) {
    e.preventDefault();
    navigate("/menu/notes");
  }

  function handleSignOut(e) {
    const isConfirmed = window.confirm("Are you sure you want to sign out?");
    if (isConfirmed) {
      localStorage.removeItem("notes");
      localStorage.removeItem("theme");
      e.preventDefault();
      navigate("/");
    }
  }

  return (
    <>
      <div className="profile-container">
        <CloseRoundedIcon onClick={closeHandler} className="close-icon" />
        <header>
          <h1 className="username">Guest User</h1>
          <p className="email">guest@notesapp.local</p>
        </header>
        <hr className="custom-hr" />
        <div className="content">
          <div className="content-left">
            <h3>Notes</h3>
            <p>{notesLength}</p>
          </div>
          <div className="content-mid">
            <h3>Storage</h3>
            <p>Local</p>
          </div>
          <div className="content-right">
            <h3>Todos</h3>
            <p>{todosLength}</p>
          </div>
        </div>
        <hr className="custom-hr" />
        <button className="sign-out" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
}
