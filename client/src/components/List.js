import React, {Fragment, useEffect, useState} from 'react';

const List = () => {

  const [todos, setTodos] = useState([])

  const getTodos = async() => {
    try {
      const response = await fetch("http://localhost:4000/todos")
      const responseJSON = await response.json();
      setTodos(responseJSON);
    } catch (error) {
      console.error(error);
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
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  )
}

export default List;