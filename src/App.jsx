import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(()=>{
    let todoString =  localStorage.getItem("todos")
    if(todoString){
    let todos =  JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }   
  },[])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) =>{
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) =>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) =>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd =() =>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }
  

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) =>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
    <div className=" container mx-auto my-2 p-5 bg-violet-200 rounded-xl min-h-[50vh] text-center w-fit">
    <h1 className="font-bold text-xl m-5">iTODO - Manage your tasks</h1>
    <div className="my-5 text-center">
      <h2 className="text-lg font-bold">Add a Todo</h2>
      <div className="">
      <input onChange={handleChange} value={todo} type="text" className=" w-80 rounded p-2" />
      <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 text-white p-2 px-3 m-2 rounded disabled:bg-violet-700 hover:bg-violet-900">Save</button>
      </div>
    </div>
    <hr className="m-2"></hr>
    <h2 className="text-center py-2 font-bold text-xl">Your Todos</h2>
    <div className="todos">
    {todos.length ===0 && <div className=" m-10">No Todos to Display</div> }
    {todos.map(item=>{

    return (showFinished || !item.isCompleted) &&<div key={item.id} className="todo flex justify-between m-4">
        <div className="flex gap-5">
        <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted}  id="" />
        <div className={item.isCompleted?"line-through my-3 cursor-pointer":"my-3 min-w-fit cursor-pointer "}>{item.todo}</div>
        </div>
        <div className="buttons flex h-full">
          <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-800 text-white p-1 px-2 m-2 rounded-sm hover:bg-violet-900"><FaEdit/></button>
          <button onClick={(e) => {handleDelete(e,item.id)}} className="bg-violet-800 text-white p-1 px-2 m-2 rounded-sm hover:bg-violet-900"><MdDelete/></button>
        </div>
      </div>
    })}
    <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
    </div>
    </div>
    </>
  );
}

export default App;
