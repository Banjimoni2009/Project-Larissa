import { useEffect, useState } from 'react'

function CustomHooks() {
    const [todos, setTodos]=useState([]);
    useEffect(() => {
        fetch('')
        .then((res) => res.json())
        .then((data) => setTodos(data))
    })   
  return (
    <div>
        <p>My todos</p>
        <div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <p>{todo.title}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CustomHooks