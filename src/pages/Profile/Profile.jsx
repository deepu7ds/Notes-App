import { useNavigate } from "react-router";
import "./profile.css";
import { supabase } from "../../client.js";
import { useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Profile() {
  const navigate = useNavigate();
  const [notesLength, setNotesLength] = useState(0);
  const [todosLength, setTodosLength] = useState(0);

  //accessing token name
  const tokenString = sessionStorage.getItem("token");
  const token = tokenString ? JSON.parse(tokenString) : null;
  const name = token?.user?.user_metadata?.name;
  const email = token?.user?.user_metadata?.email;

  useEffect(() => {
    const fetchNotesLength = async () => {
      if (!email) return;

      const { data, error } = await supabase
        .from("notes")
        .select("*", { count: "exact" })
        .eq("user_id", email);

      if (error) {
        console.error("Error fetching notes:", error);
        return;
      }

      setNotesLength(data.length);
    };

    fetchNotesLength();
  }, [email]);

  useEffect(() => {
    const fetchTodosLength = async () => {
      if (!email) return;

      const { data, error } = await supabase
        .from("todo")
        .select("*", { count: "exact" })
        .eq("user_id", email);

      if (error) {
        console.error("Error fetching todos:", error);
        return;
      }

      setTodosLength(data.length);
    };

    fetchTodosLength();
  }, [email]);

  function closeHandler(e) {
    e.preventDefault();
    navigate("/menu/notes");
  }
  function handleSignOut(e) {
    const isConfirmed = window.confirm("Are you sure you want to sign out?");
    if (isConfirmed) {
      e.preventDefault();
      navigate("/");
    }
  }

  return (
    <>
      <div className="profile-container">
        <CloseRoundedIcon onClick={closeHandler} className="close-icon" />
        <header>
          <h1 className="username">{name}</h1>
          <p className="email">{email}</p>
        </header>
        <hr className="custom-hr" />
        <div className="content">
          <div className="content-left">
            <h3>Notes</h3>
            <p>{notesLength}</p>
          </div>
          <div className="content-mid">
            <h3>Joined Date</h3>
            <p>23 Dec 2023</p>
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
