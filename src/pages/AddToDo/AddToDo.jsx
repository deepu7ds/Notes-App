import { useNavigate } from "react-router";
import { useState } from "react";
import "./addToDo.css";
import { supabase } from "../../client.js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function AddToDo() {
  const [todoData, setTodoData] = useState({
    user_id: "",
    title: "",
    done: "",
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
      <div className="addtodo-container">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            placeholder="task.."
            maxLength={30}
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
