import React, {Fragment, useEffect, useState} from 'react';
import Edit from './Edit';

const List = () => {

  const [todos, setTodos] = useState([])

  const getTodos = async() => {
    try {
      const response = await fetch("http://localhost:4000/todos")
      const responseJSON = await response.json();
      setTodos(responseJSON);
    } catch (error) {
      console.error(error.message);
    }
  }

  const deleteTodo = async(id) => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE"
      })
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Things to do</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>
                <Edit todo = {todo}/>
              </td>
              <td>
                <button 
                  className="btn btn-danger" 
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

export default List;