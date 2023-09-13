import { useEffect, useState } from 'react'
import TodoForm from '../cmps/TodoForm'
import { TodoList } from '../cmps/TodoList'
import { TodoFilter } from '../cmps/TodoFilter'
import { todoService } from '../services/todoService'

export default function TodoIndex() {
  const [todos, setTodos] = useState(null)
  const [filterBy, setFilterBy] = useState({
    title: '',
  })

  useEffect(() => {
    loadTodos()
  }, [filterBy])

  async function loadTodos() {
    const filteredTodos = await todoService.query({
      ...filterBy,

    });
    setTodos(filteredTodos);
  }

  const addNewTodo = async (newTodo) => {
    try {
      const savedTodo = await todoService.save(newTodo)
      // Update the state with the newly added todo
      setTodos((prevTodos) => [...prevTodos, savedTodo])
    } catch (error) {
      console.log('error:', error)
    }
  }

  const onRemoveTodo = async (todoId) => {
    try {
      await todoService.remove(todoId)
      console.log('Todo removed with ID:', todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onChangeFilter(filterBy) {
    setFilterBy({ ...filterBy })
}

  if (!todos) return <div>Loading...</div>

  return (
    <section>
      <TodoFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
      <TodoForm addNewTodo={addNewTodo} todos={todos} />
      <TodoList onRemoveTodo={onRemoveTodo} todos={todos} />
    </section>
  )
}
