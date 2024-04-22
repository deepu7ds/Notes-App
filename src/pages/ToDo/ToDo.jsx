import { useEffect, useState } from "react";
import { supabase } from "../../client.js";
import "./toDo.css";
import ToDoCard from "../../components/ToDoCard/ToDoCard.jsx";
import { Outlet, useOutletContext } from "react-router";

export default function ToDo() {
  const [openTodoId, setOpenTodoId] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [todos, setTodos] = useState([]);
  const [moreIconClick, setMoreIconClick] = useState(""); // for managing click state of all cards
  const [isDeleted, setIsDeleted] = useState("");

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
      .from("todo")
      .select()
      .eq("user_id", email);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setTodos(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("todo")
        .select()
        .eq("user_id", email);

      console.log(data);
      console.log(error);
      if (error) {
        setFetchError("could not fetch the todo");
        setTodos(null);
        console.log(error);
      }
      if (data) {
        setTodos(data);
        setFetchError(false);
      }
    };

    fetchNotes();
  }, []);
  const handleClick = (id) => {
    if (openTodoId === id) {
      setOpenTodoId(null); // Close the todo if it's already open
    } else {
      setOpenTodoId(id); // Open the todo
    }
  };

  return (
    <>
      {fetchError && <p>error</p>}
      <div className="todo">
        {!fetchError &&
          todos
            .filter((todo) => {
              return (
                searchInp.trim() === "" ||
                todo.title
                  .toLowerCase()
                  .includes(searchInp.trim().toLowerCase())
              );
            })
            .map((todo) => (
              <ToDoCard
                key={todo.id}
                {...todo}
                open={openTodoId === todo.id}
                clickHandler={handleClick}
                fetchData={fetchData}
                moreIconClick={moreIconClick}
                setMoreIconClick={setMoreIconClick}
                isDeleted={isDeleted}
                setIsDeleted={setIsDeleted}
              />
            ))}
      </div>
      <Outlet />
    </>
  );
}
