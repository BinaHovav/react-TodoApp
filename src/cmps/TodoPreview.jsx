import React, { useState } from 'react'
import { todoService } from '../services/todoService'
import { Link } from 'react-router-dom'

export function TodoPreview({ todo, onRemoveTodo }) {
  const [status, setStatus] = useState(todo.status)

  const toggleStatus = () => {
    const newStatus = status === 'Active' ? 'Done' : 'Active';
  
    // Update the status of the todo using the service
    todoService.save({ ...todo, status: newStatus }).then((savedTodo) => {
      setStatus(newStatus);
      console.log('todo', savedTodo);
    });
  
    // Remove the following setTimeout
  };
  

  const titleClass = status === 'Done' ? 'done' : ''

  const getCategoryColor = (category) => {
    const categoryColors = {
      Health: '#0CCE6B',
      Kids: '#EF2D56',
      Household: '#a4af2e',
      Finance: '#083D77',
      Work: '#ED7D3A',
    }
    return categoryColors[category] || 'gray'
  }

  return (
    <article className="todo-preview">
      {/* <Link to={`/todo/${todo._id}`} className="info"> */}
      <h2 onClick={toggleStatus} className={titleClass}>
        {todo.title}
      </h2>
      <h3 style={{ color: getCategoryColor(todo.category) }}>{todo.category}</h3>
      <h4>{todo.priority}</h4>
      {/* </Link> */}
      <section className="actions">
        <button onClick={() => onRemoveTodo(todo._id)}>X</button>
        <Link className="edit-todo" to={`/todo/edit/${todo._id}`}>
          Edit
        </Link>
      </section>
    </article>
  )
}
