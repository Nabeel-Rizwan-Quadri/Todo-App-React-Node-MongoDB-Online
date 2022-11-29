import { useState, useEffect } from 'react';
import axios from 'axios';

import Item from './Components/Item'
import { BACKEND_URL } from './config';
import './App.css';
// import { updateToDo } from '../../controllers/ToDoController';

function App() {

  // USED STATE SO THAT REAL TIME RENDERING IS POSSIBLE
  const [todoList, setTodoList] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setUpdating] = useState("")

  // USED TO ADD ITEM IN TODO
  const addUpdateToDo = () => {
    if (isUpdating === "") {
      axios.post(`${BACKEND_URL}/save-todo`, { text })
        .then((res) => {
          // console.log(res.data)
          setText("")
        })
        .catch((err) => { console.log(err) })
    }
    else {
      axios.post(`${BACKEND_URL}/update-todo`, { _id: isUpdating, text })
        .then((res) => {
          // console.log(res.data)
          setText("")
          setUpdating("")
        })
        .catch((err) => { console.log(err) })
    }
  }

  const deleteToDo = (_id) => {
    axios.post(`${BACKEND_URL}/delete-todo`, { _id })
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => { console.log(err) })
  }

  const updateToDo = (_id, text) => {
    setUpdating(_id)
    setText(text)
  }

  useEffect(() => {
    // console.log('useEffect')
    axios.get(`${BACKEND_URL}/get-todo`)
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err))
  }, [text, todoList])

  return (
    <div className="App">
      <div className="container">
        <h1>TODO App</h1>

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
