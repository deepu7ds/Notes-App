import { useEffect, useState } from "react";
import "./toDo.css";
import ToDoCard from "../../components/ToDoCard/ToDoCard.jsx";
import { Outlet, useOutletContext } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import { getTodos } from "../../utils/localStorage.js";

export default function ToDo() {
  const [fetchError, setFetchError] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInp = useOutletContext();

  // Fetch the latest data from localStorage
  const fetchData = () => {
    try {
      setIsLoading(true);
      const localTodos = getTodos();
      setTodos(localTodos);
      setFetchError(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setFetchError(true);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      {isLoading && <LoadingSpinner />}
      {fetchError && <p>error</p>}
      {!isLoading && todos.length == 0 && (
        <p className="empty-task">Add Some Task</p>
      )}
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
                  <ToDoCard
                    key={todo.id}
                    {...todo}
                    fetchData={fetchData}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                  />
                ))}
            </div>
          ))}
      </div>
      <Outlet />
    </>
  );
}
