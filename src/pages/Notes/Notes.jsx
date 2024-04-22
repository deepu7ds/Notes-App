import { useEffect, useState } from "react";
import { supabase } from "../../client.js";
import "./notes.css";
import NoteCard from "../../components/NoteCard/NoteCard";
import { Outlet, useOutletContext } from "react-router";

export default function Notes() {
  const [openNoteId, setOpenNoteId] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [notes, setNotes] = useState([]);
  const [moreIconClick, setMoreIconClick] = useState(""); // for managing click state of all cards

  const searchInp = useOutletContext();

  let email;
  const token = sessionStorage.getItem("token");
  if (token) {
    const parsedToken = JSON.parse(token);
    email = parsedToken.user.user_metadata.email;
  }

  // to fetch the latest data
  async function fetchData() {
    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("user_id", email);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setNotes(data);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("user_id", email);

      console.log(data);
      console.log(error);
      if (error) {
        setFetchError("could not fetch the notes");
        setNotes(null);
        console.log(error);
      }
      if (data) {
        setNotes(data);
        setFetchError(false);
      }
    };

    fetchNotes();
  }, []);
  const handleClick = (id) => {
    if (openNoteId === id) {
      setOpenNoteId(null); // Close the note if it's already open
    } else {
      setOpenNoteId(id); // Open the note
    }
  };

  return (
    <>
      {fetchError && <p>error</p>}
      <div className="notes">
        {!fetchError &&
          notes
            .filter((note) => {
              return (
                searchInp.trim() === "" ||
                note.title
                  .toLowerCase()
                  .includes(searchInp.trim().toLowerCase())
              );
            })
            .map((note) => (
              <NoteCard
                key={note.id}
                {...note}
                open={openNoteId === note.id}
                clickHandler={handleClick}
                fetchData={fetchData}
                moreIconClick={moreIconClick}
                setMoreIconClick={setMoreIconClick}
              />
            ))}
      </div>
      <Outlet />
    </>
  );
}
