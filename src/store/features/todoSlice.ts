import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Todo } from "../../interfaces/todo"

interface TodoState {
  todos: Todo[]
}
const initialState:TodoState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    init(state,action:PayloadAction<Todo[]>){
      state.todos = action.payload
    },
    addTodo(state, action: PayloadAction<Todo>){
      state.todos = [...state.todos, action.payload]
    },
    updateTodo(state, action:PayloadAction<Todo>){ 
      state.todos = state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo)
    },
    deleteTodo(state,action:PayloadAction<number>){
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    }
  }
})

export const todoAction = todoSlice.actions
export default todoSlice.reducer