import "./toDoCard.css";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteSpinner from "../DeleteSpinner/DeleteSpinner.jsx";
import { updateTodo, deleteTodo } from "../../utils/localStorage.js";

export default function ToDoCard({
  id,
  title,
  done,
  fetchData,
  isDeleting,
  setIsDeleting,
}) {
  const [selected, setSelected] = useState(done);

  const handleClick = () => {
    setSelected(!selected);
    
    try {
      updateTodo(id, { done: !selected });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!isConfirmed) {
      return;
    }

    setIsDeleting(true);
    try {
      deleteTodo(id);
      fetchData(); // Fetch the latest data after deleting a todo
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      {isDeleting ? (
        <DeleteSpinner />
      ) : (
        <div
          className={`task ${selected ? "done" : "notDone"}`}
          onClick={handleClick}
        >
          <IconButton>
            {selected ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>
          <div className="task-name">{title}</div>
          <DeleteOutlineOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Prevents the click event from reaching the parent div
              handleDeleteClick();
            }}
          />
        </div>
      )}
    </>
  );
}
