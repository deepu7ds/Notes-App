import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./addToDo.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { addTodo } from "../../utils/localStorage.js";

export default function AddToDo() {
  const [todoData, setTodoData] = useState({
    title: "",
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

  function handleChange(event) {
    setTodoData((prevTodoData) => {
      return {
        ...prevTodoData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function closeClickHandler() {
    navigate("/menu/todo");
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      addTodo({
        title: todoData.title,
      });

      navigate("/menu/todo", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error inserting todo:", error);
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
