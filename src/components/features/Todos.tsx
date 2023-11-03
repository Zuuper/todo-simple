import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/useStore"
import { STORAGE_NAME } from "../../utils/todoStorage"
import { todoAction } from "../../store/features/todoSlice"
import { TodoCard } from "../UI/TodoCard"
import { Todo } from "../../interfaces/todo"

export default function TodosFeature() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todo.todos)
  const [searchValue, setSearchValue] = useState('')
  const [searchedData, setSearchedData] = useState<Todo[]>([])



  useEffect(() => {
    const todosLocal = localStorage.getItem(STORAGE_NAME)
    if (!todosLocal) return
    dispatch(todoAction.init(JSON.parse(todosLocal)))

  }, [dispatch])

  useEffect(() => {
    if (searchValue === "") return
    setSearchedData(todos.filter((todo) => todo.title.includes(searchValue)))
  }, [searchValue, todos])
  return (
    <>
      {todos ?
        <>
          <div className="mb-8 ">
            <input placeholder="search todo" className="h-14 w-full border bg-transparent rounded-lg border-slate-200 p-4"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <Todos todos={searchValue === '' ? todos : searchedData} />
        </>
        :
        <></>
      }
    </>
  )
}
interface TodosProps {
  todos: Todo[]
}
const Todos: React.FC<TodosProps> = ({ todos }) => {
  if (todos.length == 0) {
    return <p className="text-center">we can&apos;t find todo</p>
  }
  return <div className="flex flex-col gap-4 pb-8">{todos.map((todo) => {
    return <TodoCard
      key={todo.id}
      id={todo.id}
      createdAt={todo.createdAt}
      updatedAt={todo.updatedAt}
      label={todo.label}
      status={todo.status}
      title={todo.title}
    />
  })}</div>
}


