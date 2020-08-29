import React, {Fragment, useState} from 'react'

const Input = () => {

  const [description, setDescription] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const body = { description }
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmit}>
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={event => setDescription(event.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  )
};

export default Input;