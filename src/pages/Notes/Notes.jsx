import { useEffect, useState } from "react";
import "./notes.css";
import NoteCard from "../../components/NoteCard/NoteCard.jsx";
import { Outlet, useOutletContext } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import { getNotes } from "../../utils/localStorage.js";

export default function Notes() {
  const [openNoteId, setOpenNoteId] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInp = useOutletContext();

  // Fetch data from localStorage
  const fetchData = () => {
    try {
      setIsLoading(true);
      const localNotes = getNotes();
      setNotes(localNotes);
      setFetchError(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setFetchError(true);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      {isLoading && <LoadingSpinner />}
      {fetchError && <p>Error fetching notes.</p>}
      {!isLoading && notes.length == 0 && (
        <p className="empty-notes">Add Some Notes</p>
      )}
      <div className="notes">
        {!fetchError &&
          !isLoading &&
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
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
              />
            ))}
      </div>
      <Outlet />
    </>
  );
}
