import React, {Fragment, useState} from 'react';

const Edit = ({todo}) => {
  
  const [description, setDescription] = useState(todo.description)

  const updateTodo = async event => {
    event.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <button 
        type="button" 
        className="btn btn-primary" 
        data-toggle="modal" 
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${todo.id}`} onClick={() => setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button 
                type="button" 
                className="close" 
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >&times;</button>
            </div>
            <div className="modal-body">
              <input 
                type="text" 
                className="form-control" 
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-primary" 
                data-dismiss="modal"
                onClick={event => updateTodo(event)} 
              >Update</button>
              <button 
                type="button" 
                className="btn btn-danger" 
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Edit;