import React, { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/ToDoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

export default function App() {
  const [todos, setTodos] = useState([]);
  // const [todos, setTodos] = useState(() => {
  //   const storedTodos = localStorage.getItem('todos');
  //   return storedTodos ? JSON.parse(storedTodos) : [];
  // });  //If you are not using the initial useEffect hook without any dependencies 
  //(which means it runs only once after the initial render), 
  //and you want to ensure that todos are not overwritten by an empty array during the initial render

  const addTodo = (todo)=>{
    setTodos((prev)=> [{id: Date.now(),...todo}, ...prev]) //Spreading the till now array data and adding the new data in front 
  }

  const updateTodo = (id, todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=> prevTodo.id===id ? todo: prevTodo))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter((todo) => todo.id !== id)) //Filter and pass all todos in the array which doesnt match this current id 
  }

  const toggleComplete = (id)=>{
    setTodos((prev)=>prev.map((prevTodo)=> prevTodo.id===id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }
  //Here in the map function taking every todo and finding which matches the id and then spreading the all properties of that particular
  //object and then overwriting the completed property and returning this new object
 
  useEffect(()=>{
    //When you don't provide any dependencies in the dependency array (second argument), the useEffect hook will be triggered only once after the initial render of the component.
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      //todos here will be an array with objects as individual todos
      setTodos(todos);
      console.log("Use Effect without dependencies triggered");
      //ToDos are preserved as we use useEffect after refresh too and we get to see the previous todos
    }  
  }, [])
 

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log("Todos set Flag");
  }, [todos])


  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          {todos.map((todo)=>(
            <div key={todo.id}
            //To optimize the code use key so that DOM Tree gets to know for unique ids if the content of the todos is same
            className='w-full'>
              <TodoItem todo = {todo}/>
              </div>
          ))}
        </div>
    </div>
</div>
</TodoProvider> 
  )
}
