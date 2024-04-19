import { useState } from "react";
import { useNavigate } from "react-router";
import "./addNotes.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { supabase } from "../../client";

export default function AddNotes() {
  const [noteData, setNoteData] = useState({
    user_id: "",
    title: "",
    content: "",
    importance: "",
  });
  const navigate = useNavigate();
  let data;

  const token = sessionStorage.getItem("token");
  if (token) {
    data = JSON.parse(token);
  }

  function handleChange(event) {
    setNoteData((prevNoteData) => {
      return {
        ...prevNoteData,
        user_id: data?.user.user_metadata.email,
        [event.target.name]: event.target.value,
      };
    });
    console.log(noteData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("notes").insert([
      {
        user_id: noteData.user_id,
        title: noteData.title,
        content: noteData.content,
        importance: noteData.importance,
      },
    ]);

    if (error) {
      console.error("Error inserting note:", error);
    } else {
      navigate("/menu/notes", { replace: true });
      window.location.reload();
      console.log("Note inserted successfully:", data);
    }
  }

  function clickHandler() {
    navigate("/menu/notes");
  }

  return (
    <>
      <div className="overlay" onClick={clickHandler}></div>
      <div className="addNotes-container">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title..."
            onChange={handleChange}
            required
          />

          <textarea
            id="content"
            name="content"
            onChange={handleChange}
            placeholder="content..."
          />
          <select
            id="importance"
            name="importance"
            onChange={handleChange}
            required
          >
            <option value="">Select importance</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">Create</button>
        </form>
        <CloseRoundedIcon className="overlay-close" onClick={clickHandler} />
      </div>
    </>
  );
}
