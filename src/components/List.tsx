import React, { useState } from "react";

const List = () => {
  const [task, setTask] = useState<string>("");
  const [todo, setTodo] = useState<string[]>([]);
  const [completedTodo, setCompletedTodo] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  // Add or Edit Task
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim().length !== 0) {
      if (editIndex !== null) {
        let editedTodo = todo.map((ele, index) =>
          index === editIndex ? task : ele
        );
        setTodo(editedTodo); // Update the task list
        setTask("");
        setEditIndex(null); // Exit edit mode
      } else {
        // Add mode: if adding a new task
        setTodo([...todo, task]);
        setTask("");
      }
    }
  };

  // Edit a task from the list
  const handleEditTask = (editIndex: number) => {
    setEditIndex(editIndex); // Enter edit mode with selected index
    const editedValue = todo[editIndex]; // Get the task value to edit
    setTask(editedValue); // Set the input field with the existed value to edit
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditIndex(null); // Exit edit mode
    setTask(""); // Clear input field
  };

  // Delete a task from the list
  const handleDeleteCurrentTask = (delIndex: number) => {
    const afterDeletionTasks = todo.filter((_, index) => index !== delIndex);
    setTodo(afterDeletionTasks); // Update the list
  };

  // Mark task as completed
  const handleCompletedTodo = (completedIndex: number) => {
    const afterCompletionTasks = todo.filter((ele, index) => {
      if (index !== completedIndex) {
        return ele;
      } else {
        setCompletedTodo([...completedTodo, ele]);
      }
    });
    setTodo(afterCompletionTasks); // Update the list
  };

  // Toggle completed tasks visibility
  const toggleCompletedTasks = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="container">
      <form onSubmit={handleAddTodo}>
        <label htmlFor="taskInput">Add Notes here</label>
        <input
          type="text"
          id="taskInput"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button style={{marginRight:"15px"}} type="submit">Add</button>

        {/* Show the Cancel Edit button only when editing */}
        {editIndex !== null && (
          <button type="button" className="cancel" onClick={handleCancelEdit}>
            <i className="fa-solid fa-delete-left"></i>
          </button>
        )}
      </form>

      <div>
        {todo.length !== 0 && <h3>Tasks</h3>}
        <ol>
          {todo.map((ele, index) => (
            <li key={index}>
              {index + 1}. {ele}
              <div>
                <button className="edit" style={{marginRight:"10px"}} onClick={() => handleEditTask(index)}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button style={{marginRight:"10px"}}
                  className="delete"
                  onClick={() => handleDeleteCurrentTask(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  className="completed"
                  onClick={() => handleCompletedTodo(index)}
                >
                  &#x2714; Completed
                </button>
              </div>
            </li>
          ))}
        </ol>

        {/* Toggle button for completed tasks */}
        {completedTodo.length !== 0 && (
          <>
            <button onClick={toggleCompletedTasks}>
              {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
            </button>
            {showCompleted && (
              <ol>
                {completedTodo.map((ele, index) => (
                  <li key={index} style={{ textDecoration: "line-through" }}>
                    {index + 1}. {ele}
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
