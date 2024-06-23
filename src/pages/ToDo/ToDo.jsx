import { useEffect, useState } from "react";
import { supabase } from "../../client.js";
import "./toDo.css";
import ToDoCard from "../../components/ToDoCard/ToDoCard.jsx";
import { Outlet, useOutletContext } from "react-router";
import Spinner from "../../components/Spinner/Spinner.jsx";

export default function ToDo() {
  const [fetchError, setFetchError] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchInp = useOutletContext();

  let email;
  const token = sessionStorage.getItem("token");
  if (token) {
    const parsedToken = JSON.parse(token);
    email = parsedToken.user.user_metadata.email;
  }

  const cachedTodos = sessionStorage.getItem("cachedTodos");
  // Check cache before fetching data
  useEffect(() => {
    if (cachedTodos) {
      setTodos(JSON.parse(cachedTodos));
    } else {
      fetchData();
    }
  }, [email]);

  // Fetch the latest data
  async function fetchData() {
    if (!cachedTodos) {
      setIsLoading(true);
    }
    const { data, error } = await supabase
      .from("todo")
      .select()
      .eq("user_id", email);

    if (error) {
      console.error("Error fetching data:", error);
      setFetchError(true);
    } else {
      setTodos(data);
      sessionStorage.setItem("cachedTodos", JSON.stringify(data)); // Cache the fetched data
      setFetchError(false);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("todo")
        .select()
        .eq("user_id", email)
        .order("created_at", { ascending: false });

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

  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const todosByDate = sortedTodos.reduce((groups, todo) => {
    const date = new Date(todo.created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});

  return (
    <>
      {isLoading && <Spinner />}
      {fetchError && <p>error</p>}
      <div className="todo">
        {!fetchError &&
          !isLoading &&
          Object.entries(todosByDate).map(([date, todos]) => (
            <div className="task-container">
              <h3 className="todo-date">{date}</h3>
              {todos
                .filter((todo) => {
                  return (
                    searchInp.trim() === "" ||
                    todo.title
                      .toLowerCase()
                      .includes(searchInp.trim().toLowerCase())
                  );
                })
                .map((todo) => (
                  <ToDoCard key={todo.id} {...todo} fetchData={fetchData} />
                ))}
            </div>
          ))}
      </div>
      <Outlet />
    </>
  );
}
