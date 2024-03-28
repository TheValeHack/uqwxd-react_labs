import React, {useEffect, useState} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  useEffect(() => {
    const localData = localStorage.getItem("todos");
    const loadedData = JSON.parse(localData);
    if(loadedData){
      setTodos(loadedData);
    }
  }, []);

  useEffect(()=>{
    if(todos.length >= 0){
      let jsonTodos = JSON.stringify(todos);
      localStorage.setItem("todos", jsonTodos);
    }
  }, [todos])
  
  // Add the handlesubmit code here
  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = document.getElementById("todoAdd").value;
    const todoItem = {
      "id": new Date().getTime(),
      "text": todo.trim(),
      "complete": false
    };
    if(todoItem.text.length > 0){
      setTodos([...todos].concat(todoItem));
    } else {
      alert("Enter Valid Task!");
    }
  }
  
  // Add the deleteToDo code here
  const deleteToDo = (id) => {
    const todoItem = todos.filter(todo => {
      return todo.id !== id;
    })
    setTodos(todoItem)
  }

  
  // Add the toggleComplete code here
  const toggleComplete = (id) => {
    let todoItem = todos.map(todo => {
      if(todo.id === id){
        todo.complete = !todo.complete;
      }
      return todo;
    })

    setTodos(todoItem);
  }

  
  // Add the submitEdits code here
  const submitEdits = (thisTodo)  => {
    let todoItem = todos.map(todo => {
      if(todo.id === thisTodo.id){
        let todoValue = document.getElementById(thisTodo.id).value;
        thisTodo.text = todoValue;
      }
      return todo;
    })
    setTodos(todoItem);
    setTodoEditing(null);
  }

  
return(
<div className ="App">
  <h1>Todo List</h1>
  <form onSubmit={handleSubmit}>
  <input type ="text" align ="right" id= 'todoAdd'/>
  <button type ="submit">Add Todo</button>
  </form>
  {
    todos.map(item => {
      return (
        <div className="todo">
          <div className="todo-text">
            <input type="checkbox" checked={item.complete} onChange={() => toggleComplete(item.id)} />
            {
              todoEditing === item.id ? (
                <input type="text" id={item.id} defaultValue={item.text} />
              ) : item.text
            }
          </div>
          <div className="todo-actions">
            {
              todoEditing === item.id ? (
                <button onClick={() => submitEdits(item)}>Submit edit</button>
              ) : (
                <button onClick={() =>setTodoEditing(item.id)}>Edit</button>
              )
            }
            <button onClick={() => deleteToDo(item.id)}>Delete</button>
          </div>
        </div>
      )
    })
  }
</div>
);
};
export default App;
