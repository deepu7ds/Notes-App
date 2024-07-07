import { useEffect, useState } from "react";
import { supabase } from "../../client.js";
import "./notes.css";
import NoteCard from "../../components/NoteCard/NoteCard.jsx";
import { Outlet, useOutletContext } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

export default function Notes() {
  const [openNoteId, setOpenNoteId] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInp = useOutletContext();

  let email;
  const token = sessionStorage.getItem("token");
  if (token) {
    const parsedToken = JSON.parse(token);
    email = parsedToken.user.user_metadata.email;
  }
  const cachedNotes = sessionStorage.getItem("cachedNotes");

  // Check cache before fetching data
  useEffect(() => {
    if (cachedNotes) {
      setNotes(JSON.parse(cachedNotes));
    } else {
      fetchData();
    }
  }, [email]);

  // Fetch the latest data
  async function fetchData() {
    if (!cachedNotes) {
      setIsLoading(true); // Step 2: Set loading to true before fetching
    }
    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("user_id", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      setFetchError(true);
    } else {
      setNotes(data); // Assuming you want to set the fetched data to notes
      sessionStorage.setItem("cachedNotes", JSON.stringify(data)); // Cache the fetched data
    }
    setIsLoading(false); // Step 3: Set loading to false after fetching
    setIsDeleting(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("user_id", email)
        .order("created_at", { ascending: false });

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
