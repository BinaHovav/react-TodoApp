
import React, { memo } from 'react'
import { TodoPreview } from './TodoPreview'

export const TodoList = memo(({ todos, onRemoveTodo }) => {

    console.log('list rendered')
    
   
    return (
        <section className="todo-list">
          <ul>
          {todos.map((todo) => (
            <TodoPreview key={todo._id} todo={todo} onRemoveTodo={onRemoveTodo} />
            ))}
          </ul>
        </section>
      )}
)
