import React, { useEffect, useState } from 'react'
import { todoService } from '../services/todoService'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTodo()
    }, [params.id])


    async function loadTodo() {
        const todo = await todoService.getById(params.id)
        setTodo(todo)
    }


    function onBack() {
        navigate('/')
        // navigate(-1)
    }
    
    if (!todo) return <div>Loading...</div>
    return (
        <section className='todo-details'>
            <section>
                <h3>Todo: {todo.title}</h3>
            </section>
            <section>
                <h3>Category: {todo.category}</h3>
            </section>
            <section>
                <h3>Priority: {todo.priority}</h3>
            </section>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
