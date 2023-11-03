import { useState } from "react"
import { Todo } from "../../interfaces/todo"
import { Button } from "../UI/Button"
import { updateTodo } from "../../utils/todoStorage"
import { useAppDispatch } from "../../hooks/useStore"
import { todoAction } from "../../store/features/todoSlice"



const MAX_LABEL_LENGTH = 14
export interface UpdateTodoFeatureProps {
  initialTodo: Todo,
  setIsEdited: () => void
}
export default function UpdateTodoFeature({ initialTodo, setIsEdited }: UpdateTodoFeatureProps) {
  const dispatch = useAppDispatch()
  const [todo, setTodo] = useState<Todo>(initialTodo)
  const onSubmit = () => {
    if (todo.title == "") {
      alert('you need to include todo title')
      return
    }
    const response = updateTodo(todo)

    if (!response.success) {
      dispatch(todoAction.init(response.data))
      return
    }
    dispatch(todoAction.updateTodo(response.data[0]))
    setIsEdited()
    return
  }
  return (
    <>
      <h4 className="text-sm mb-4 font-semibold">editing todo</h4>
      <form className="" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
          <input
            type="text"
            placeholder="input title"
            className="h-14 border bg-transparent rounded-lg border-slate-200 p-4"
            value={todo.title!}
            required
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          >

          </input>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="input label"
              className="h-14 border bg-transparent rounded-lg border-slate-200 p-4"
              value={todo.label!}
              onChange={(e) => {
                if (e.target.value.length > MAX_LABEL_LENGTH) return
                setTodo({ ...todo, label: e.target.value })
              }}
            ></input>
            <small className="text-right">{todo.label?.length}/{MAX_LABEL_LENGTH}</small>
          </div>
        </div>
        <Button onClick={setIsEdited} className="bg-transparent px-4 font-semibold mr-4">back</Button>
        <Button type="submit">Submit</Button>
      </form >
    </>
  )
}
