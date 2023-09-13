import React, { useState } from 'react'
import { todoService } from '../services/todoService'

function TodoForm({addNewTodo}) {
  const initialTodo = todoService.getEmptyTodo()
  const [todo, setTodo] = useState(initialTodo)
  //   const navigate = useNavigate()

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function onSaveTodo(ev) {
    ev.preventDefault();
    try {
      addNewTodo(todo);
      setTodo(initialTodo)
    } catch (error) {
      console.log('error:', error);
    }
  }
  

  const { title, category, priority } = todo

  return (
    <section className="todo-form">
      <form onSubmit={ onSaveTodo }>
        <label htmlFor="title">Todo:</label>
        <input placeholder="Write here the title" onChange={handleChange} value={title} type="text" name="title" id="title" />

        <label htmlFor="category">Category:</label>
        <select onChange={handleChange} value={category} name="category" id="category">
          <option disabled value="">
            Choose a category
          </option>
          <option value="Health">Health</option>
          <option value="Kids">Kids</option>
          <option value="Work">Work</option>
          <option value="Household">Household</option>
          <option value="Finances">Finances</option>
        </select>

        <label htmlFor="priority">Priority:</label>
        <select onChange={handleChange} value={priority} name="priority" id="priority">
          <option disabled value="">
            Choose a priority
          </option>
          <option value="High priority">High priority</option>
          <option value="Medium priority">Medium priority</option>
          <option value="Low priority">Low priority</option>
        </select>

        <button>Save</button>
      </form>
    </section>
  )
}

export default TodoForm
