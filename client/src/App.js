import { useState, useEffect } from 'react';
import axios from 'axios';

import Item from './Components/Item'
import './App.css';
// import { updateToDo } from '../../controllers/ToDoController';

function App() {

  // USED STATE SO THAT REAL TIME RENDERING IS POSSIBLE
  const [todoList, setTodoList] = useState([])
  // console.log("todoList app", todoList)
  const [text, setText] = useState("")
  const [isUpdating, setUpdating] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/get-todo')
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err))
  })

  // USED TO ADD ITEM IN TODO
  const addUpdateToDo = () => {
    if (isUpdating === "") {
      axios.post('http://localhost:5000/save-todo', { text })
        .then((res) => {
          console.log(res.data)
          setText("")
        })
        .catch((err) => { console.log(err) })
    }
    else {
      axios.post('http://localhost:5000/update-todo', { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data)
          setText("")
          setUpdating("")
        })
        .catch((err) => { console.log(err) })
    }
  }

  const deleteToDo = (_id) => {
    console.log("delete", _id)
    axios.post('http://localhost:5000/delete-todo', { _id })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => { console.log(err) })

  }

  const updateToDo = (_id, text) => {
    setUpdating(_id)
    setText(text)
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className='top'>
          <input type="text"
            placeholder='Enter item'
            onChange={e => setText(e.target.value)}
            value={text}
          ></input>

          <button className='add' onClick={addUpdateToDo}>
            {isUpdating ? "update" : "ADD"}</button>
        </div>

        <div className='list'></div>
        {todoList.map(item => {
          return <Item key={item._id}
            text={item.text}
            remove={() => deleteToDo(item._id)}
            update={() => updateToDo(item._id, item.text)} />
        })}
      </div>

    </div>
  );
}

export default App;
