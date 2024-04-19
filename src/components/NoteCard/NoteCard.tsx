import { useEffect } from "react";
import "./noteCard.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function NoteCard({
  id,
  title,
  content,
  importance,
  open,
  clickHandler,
}) {
  // Create a new Date object

  const priority = importance - 1;

  const date = new Date();

  // Convert the date to a string in the format 'Month Day, Year'
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //finding day
  const dayNumber = date.getDay(); // this will return number from 0 to 7
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

  return (
    <>
      <div
        className="note-container"
        style={{ backgroundColor: colors[priority].primary }}
        onClick={() => clickHandler(id)}
      >
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
