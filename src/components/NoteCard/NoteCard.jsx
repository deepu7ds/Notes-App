import "./noteCard.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { supabase } from "../../client.js";

export default function NoteCard({
  id,
  created_at,
  title,
  content,
  importance,
  open,
  clickHandler,
  fetchData,
  moreIconClick,
  setMoreIconClick,
}) {
  // Create a new Date object

  const priority = importance - 1;
  const created_at_date = new Date(created_at);

  // Convert the date to a string in the format 'Month Day, Year'
  const dateString = created_at_date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //finding day
  const dayNumber = created_at_date.getDay(); // this will return number from 0 to 7
  console.log(dayNumber);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[dayNumber];

  //color schema on the basis of importance
  const colors = [
    {
      primary: "#FEB0B0",
      secondary: "#EA7474",
    },
    {
      primary: "#F3F7A9",
      secondary: "#D8E209",
    },
    {
      primary: "#B8F3C9",
      secondary: "#47E209",
    },
  ];

  function moreClickHandler(event) {
    event.stopPropagation(); // to prevent conditional statement to render this is called event bubbling
    if (moreIconClick === id) {
      setMoreIconClick(null);
    } else {
      setMoreIconClick(id);
    }
  }

  async function deleteHandler(event) {
    event.stopPropagation();
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.error("Error deleting note:", error);
    } else {
      console.log("Note deleted successfully");
      fetchData();
    }
  }

  function editHandler() {}
  return (
    <>
      <div
        className="note-container"
        style={{ backgroundColor: colors[priority].primary }}
        onClick={() => clickHandler(id)}
      >
        <>
          <div className="more-icon">
            <MoreVertIcon onClick={moreClickHandler} />
          </div>
          <div
            className="note-day"
            style={{ backgroundColor: colors[priority].secondary }}
          >
            {day}
          </div>
          <h1 className="note-title">{title}</h1>
          <p className="note-content">{content}</p>
          <div
            className="note-date"
            style={{ color: colors[priority].secondary }}
          >
            <strong>{dateString}</strong>
          </div>{" "}
          {/* Insert the date string here */}
          {moreIconClick === id && (
            <div className="modification-popup">
              <button className="delete" onClick={deleteHandler}>
                Detete
              </button>
              <button className="edit" onClick={editHandler}>
                Edit
              </button>
            </div>
          )}
        </>
      </div>
      {open && (
        <>
          <div className="overlay" onClick={() => clickHandler(id)}></div>
          <div
            className="note-container__active"
            style={{ backgroundColor: colors[priority].primary }}
          >
            <div
              className="note-day"
              style={{ backgroundColor: colors[priority].secondary }}
            >
              {day}
            </div>
            <h1 className="note-title__active">{title}</h1>
            <p className="note-content__active">{content}</p>
            <div
              className="note-date"
              style={{ color: colors[priority].secondary }}
            >
              <strong>{dateString}</strong>
            </div>
            <CloseRoundedIcon
              className="overlay-close"
              onClick={() => clickHandler(id)}
            />
          </div>
        </>
      )}
    </>
  );
}