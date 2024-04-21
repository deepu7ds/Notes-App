import { useNavigate } from "react-router";
import { useState } from "react";
import "./addToDo.css";
import { supabase } from "../../client";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function AddToDo() {
  const [todoData, setTodoData] = useState({
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
        content: todoData.content,
        importance: todoData.importance,
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
      <div className="addtodo-container">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            placeholder="task.."
          />
          <input
            type="text"
            name="content"
            id="content"
            onChange={handleChange}
            placeholder="details..."
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
