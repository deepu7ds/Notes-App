import "./toDoCard.css";
import { useState } from "react";
import { supabase } from "../../client.js";
import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function ToDoCard({ id, title, done, fetchData }) {
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
    const { error } = await supabase.from("todo").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      fetchData(); // Fetch the latest data after deleting a todo
    }
  };

  return (
    <>
      <div className={`task ${selected ? "done" : ""}`}>
        <IconButton onClick={handleClick}>
          {selected ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
        <div className="task-name">{title}</div>
        <DeleteOutlineOutlinedIcon onClick={handleDeleteClick} />
      </div>
    </>
  );
}
