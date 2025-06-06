import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // optional styling

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(`${API}/todos`, { text });
      setText("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container">
      <h2>📝 Todo App</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a todo...."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id}>
              {todo.text}
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
