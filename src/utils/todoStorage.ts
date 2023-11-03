import moment from "moment"
import { Todo } from "../interfaces/todo"

export const STORAGE_NAME = 'todo' 
export const createTodo = (title: string,label?: string) => {
  const data:Todo = {
    id: moment().unix(),
    title: title,
    label:label ?? '',
    status: 'active',
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString()
  }
  const localData = localStorage.getItem(STORAGE_NAME)
  if(localData){
    localStorage.setItem(STORAGE_NAME, JSON.stringify([...JSON.parse(localData), data]))
  }else{
    localStorage.setItem(STORAGE_NAME, JSON.stringify([data]))
  }
  alert('success add new data')
  return data
}

export const updateTodo = (todo:Todo) => {
  const newTodo:Todo = {...todo,updatedAt: moment().toISOString()}
  const localData = localStorage.getItem(STORAGE_NAME)
  if(!localData) {
    alert("there's error when update todo, create new one instead")
    localStorage.setItem(STORAGE_NAME, JSON.stringify([newTodo]))
    return {success: false, data: [newTodo]}
  }

  const finalData:Todo[] = JSON.parse(localData)
  localStorage.setItem(STORAGE_NAME, JSON.stringify(finalData.map((todo) => todo.id == newTodo.id ? newTodo : todo)))
  alert('successfully update todo')
  return {success:true, data: [newTodo]}
}

export const deleteTodo = (id:number) => {
  const localData = localStorage.getItem(STORAGE_NAME)

  if(!localData) {
    alert("we can't find the todo data, abort the execution")
    return {success: false}
  }
  const finalData:Todo[] = JSON.parse(localData)
  const data = finalData.filter((todo) => todo.id !== id)
  localStorage.setItem(STORAGE_NAME, JSON.stringify(data))
  alert('success Delete todo')
  return {success:true}
}