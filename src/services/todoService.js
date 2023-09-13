import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const todoService = {
  query,
  save,
  remove,
  getById,
  getEmptyTodo,
  tryTodo,
}

const STORAGE_KEY = 'todos'

const gDefaultTodos = [
  { _id: 't1', title: 'Sign up to the gym', category: 'Health', priority: 'High priority', status: 'Active' },
  { _id: 't2', title: 'Make an appointment to the dentist', category: 'Kids', priority: 'High priority', status: 'Active' },
  { _id: 't3', title: 'Check the bank statements', category: 'Finance', priority: 'Medium priority', status: 'Active' },
  { _id: 't4', title: 'Prepare the presentation for the meeting', category: 'Work', priority: 'Medium priority', status: 'Active' },
  { _id: 't5', title: 'Wash the floor', category: 'Household', priority: 'Medium priority', status: 'Done' },
]

var gTodos = _loadTodos()

function query(filterBy) {
  let todosToReturn = gTodos;

  if (filterBy) {
    var { title, category, priority, status } = filterBy;
    
    title = title.toLowerCase();

    todosToReturn = todosToReturn.filter((todo) => {
      const lowerTitle = todo.title.toLowerCase();

      const titleMatch = lowerTitle.includes(title);
      const categoryMatch = !category || todo.category === category;
      const priorityMatch = !priority || todo.priority === priority;
      const statusMatch = !status || todo.status === status;

      return titleMatch && categoryMatch && priorityMatch && statusMatch
    });
  }

  return Promise.resolve([...todosToReturn]);
}



function tryTodo(id) {
  const todo = gTodos.find((todo) => todo._id === id)
  todo.batteryStatus -= 10
  return Promise.resolve()
}
function getById(id) {
  const todo = gTodos.find((todo) => todo._id === id)
  return Promise.resolve({ ...todo })
}

function remove(id) {
  const idx = gTodos.findIndex((todo) => todo._id === id)
  gTodos.splice(idx, 1)
  if (!gTodos.length) gTodos = gDefaultTodos.slice()
  storageService.store(STORAGE_KEY, gTodos)
  return Promise.resolve()
}

function save(todoToSave) {
  if (todoToSave._id) {
    const idx = gTodos.findIndex((todo) => todo._id === todoToSave._id)
    gTodos.splice(idx, 1, todoToSave)
  } else {
    todoToSave._id = makeId()
    gTodos.push(todoToSave)
  }
  storageService.store(STORAGE_KEY, gTodos)
  return Promise.resolve(todoToSave)
}

function getEmptyTodo() {
  return {
    title: '',
    category: '',
    priority: '',
    status: 'Active',
  }
}

function _loadTodos() {
  let todos = storageService.load(STORAGE_KEY)
  if (!todos || !todos.length) todos = gDefaultTodos
  storageService.store(STORAGE_KEY, todos)
  return todos
}
