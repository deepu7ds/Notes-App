import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./addNotes.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { supabase } from "../../client.js";

export default function AddNotes() {
  const [noteData, setNoteData] = useState({
    user_id: "",
    title: "",
    content: "",
    importance: "",
  });

  const [center, setCenter] = useState({ x: -50, y: -50 });

  const handleMouseClick = (e) => {
    const xPercentage = -100 + (e.clientX / window.innerWidth) * 100;
    const yPercentage = -100 + (e.clientY / window.innerHeight) * 100;
    setCenter({ x: xPercentage, y: yPercentage });
  };

  useEffect(() => {
    // Attach the event listener to the window when the component mounts
    window.addEventListener("click", handleMouseClick);

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

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

  function closeClickHandler() {
    navigate("/menu/notes");
  }

  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          closeClickHandler();
        }}
      ></div>
      <div
        className="addNotes-container"
        style={{
          "--x": `${center.x}%`,
          "--y": `${center.y}%`,
        }}
      >
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
        <CloseRoundedIcon
          className="overlay-close"
          onClick={closeClickHandler}
        />
      </div>
    </>
  );
}
