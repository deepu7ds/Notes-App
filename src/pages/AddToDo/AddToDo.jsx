import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./addToDo.css";
import { supabase } from "../../client.js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function AddToDo() {
  const [todoData, setTodoData] = useState({
    user_id: "",
    title: "",
    done: "",
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
    setTodoData((prevTodoData) => {
      return {
        ...prevTodoData,
        user_id: data?.user.user_metadata.email,
        [event.target.name]: event.target.value,
      };
    });
    console.log(todoData);
  }

  function closeClickHandler() {
    navigate("/menu/todo");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("todo").insert([
      {
        user_id: todoData.user_id,
        title: todoData.title,
        done: false,
      },
    ]);

    if (error) {
      console.error("Error inserting todo:", error);
    } else {
      navigate("/menu/todo", { replace: true });
      window.location.reload();
      console.log("todo inserted successfully:", data);
    }
  }

  return (
    <>
      <div className="overlay" onClick={closeClickHandler}></div>
      <div
        className="addtodo-container"
        style={{
          "--x": `${center.x}%`,
          "--y": `${center.y}%`,
        }}
      >
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            placeholder="task.."
            maxLength={40}
            required
          />
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
