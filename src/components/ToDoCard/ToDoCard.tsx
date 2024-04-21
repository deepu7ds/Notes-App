import "./toDoCard.css";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { supabase } from "../../client";

export default function ToDoCard({
  id,
  created_at,
  title,
  content,
  importance,
  open,
  clickHandler,
  fetchData,
  isDeleted,
  setIsDeleted,
}) {
  const [done, setDone] = useState(false);

  const priority = importance - 1;
  const created_at_date = new Date(created_at);

  const dateString = created_at_date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const priorityArray = [
    {
      primary: "#FEB0B0",
      secondary: "#EA7474",
      content: "High",
    },
    {
      primary: "#F3F7A9",
      secondary: "#D8E209",
      content: "Medium",
    },
    {
      primary: "#B8F3C9",
      secondary: "#47E209",
      content: "Low",
    },
  ];

  function doneChangeHandler(event) {
    event.stopPropagation();
    setDone(!done);
  }

  async function deleteHandler(event) {
    event.stopPropagation();
    const { error } = await supabase.from("todo").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      console.log("todo deleted successfully");
      fetchData();
    }
  }

  function deleteOpener(event) {
    event.stopPropagation();
    setIsDeleted(id);
  }
  function deleteClearHandler(event) {
    event.stopPropagation();
    setIsDeleted(null);
  }
  return (
    <>
      <div
        className={`todo-container ${done ? "done" : ""}
        }`}
        style={done ? {} : { backgroundColor: priorityArray[priority].primary }}
        onClick={deleteOpener}
      >
        <div
          className={`content-wrapper ${isDeleted === id ? "blur" : ""} ${
            done ? "done" : ""
          }`}
          style={
            done ? {} : { backgroundColor: priorityArray[priority].primary }
          }
        >
          <h3 className="title">{title}</h3>
          <p className="content">{content}</p>
          <div className="footer">
            <p
              className="priority"
              style={{ backgroundColor: priorityArray[priority].secondary }}
            >
              {priorityArray[priority].content}
            </p>
            <p className="date">
              <strong>{dateString}</strong>
            </p>
          </div>
          {done && (
            <DoneIcon
              className="done-status done"
              onClick={doneChangeHandler}
            />
          )}
          {!done && (
            <RemoveDoneIcon
              className="done-status notdone"
              onClick={doneChangeHandler}
            />
          )}
        </div>
        {isDeleted === id && (
          <button className="delete-btn" onClick={deleteHandler}>
            Delete
          </button>
        )}
        {isDeleted === id && (
          // it is used just to solve a bug it has no other purpose
          <ClearIcon className="clear-icon" onClick={deleteClearHandler} />
        )}
      </div>
    </>
  );
}
