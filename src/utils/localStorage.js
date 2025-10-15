// Utility functions for localStorage operations

// Notes operations
export const getNotes = () => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

export const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const addNote = (note) => {
  const notes = getNotes();
  const newNote = {
    ...note,
    id: Date.now().toString(), // Simple ID generation
    created_at: new Date().toISOString(),
  };
  notes.unshift(newNote); // Add to beginning
  saveNotes(notes);
  return newNote;
};

export const updateNote = (id, updates) => {
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...updates };
    saveNotes(notes);
    return notes[index];
  }
  return null;
};

export const deleteNote = (id) => {
  const notes = getNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  saveNotes(filteredNotes);
  return true;
};

// Todos operations
export const getTodos = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const addTodo = (todo) => {
  const todos = getTodos();
  const newTodo = {
    ...todo,
    id: Date.now().toString(), // Simple ID generation
    created_at: new Date().toISOString(),
    done: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
};

export const updateTodo = (id, updates) => {
  const todos = getTodos();
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updates };
    saveTodos(todos);
    return todos[index];
  }
  return null;
};

export const deleteTodo = (id) => {
  const todos = getTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  saveTodos(filteredTodos);
  return true;
};

// Guest user session
export const setGuestSession = () => {
  sessionStorage.setItem('isGuest', 'true');
};

export const isGuestUser = () => {
  return sessionStorage.getItem('isGuest') === 'true';
};

export const clearGuestSession = () => {
  sessionStorage.removeItem('isGuest');
};
