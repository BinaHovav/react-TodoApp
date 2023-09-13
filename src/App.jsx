import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

import './App.css'
import './assets/scss/global.scss'

import { AppHeader } from './cmps/AppHeader'
// import { TodoDetails } from './pages/TodoDetails'
import { TodoEdit } from './cmps/TodoEdit'
import TodoIndex from './pages/TodoIndex'

function App() {
  return (
    <Router>
      <section className="todo-app">
        <AppHeader />
        <Routes>
          {/* <Route path="/todo/:id" element={<TodoDetails />} /> */}
          <Route path="/" element={<TodoIndex />} />
          <Route path="todo/edit/:id" element={<TodoEdit />} />
        </Routes>
        <footer>
          <section className="container">Bina's Todo-App 2023 &copy;</section>
        </footer>
      </section>
    </Router>
  )
}

export default App
