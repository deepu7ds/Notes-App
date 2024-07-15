import "./toDoCard.css";
import { useState } from "react";
import { supabase } from "../../client.js";
import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteSpinner from "../DeleteSpinner/DeleteSpinner.jsx";

export default function ToDoCard({
  id,
  title,
  done,
  fetchData,
  isDeleting,
  setIsDeleting,
}) {
  const [selected, setSelected] = useState(done);

  const handleClick = async () => {
    setSelected(!selected);

    const { error } = await supabase
      .from("todo")
      .update({ done: !selected })
      .eq("id", id);

    if (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!isConfirmed) {
      return;
    }

    setIsDeleting(true);
    const { error } = await supabase.from("todo").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      fetchData(setIsDeleting); // Fetch the latest data after deleting a todo
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
