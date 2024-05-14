import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "ToDo Message",
            completed: false,
        }
    ], 
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {}, 
    toggleComplete: (id) => {}
})

export const useTodo = ()=>{
    return useContext(TodoContext)
}
//By defining it this way, we ensure that "useTodo" is callable within a component, and when it is invoked, it returns the value obtained from "TodoContext" 

export const TodoProvider = TodoContext.Provider