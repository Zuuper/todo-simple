import { useState } from "react"
import { Todo } from "../../interfaces/todo"
import { Button } from "../UI/Button"
import { createTodo } from "../../utils/todoStorage"
import { useAppDispatch } from "../../hooks/useStore"
import { todoAction } from "../../store/features/todoSlice"

type Input = Partial<Todo>
const MAX_LABEL_LENGTH = 14
export default function CreateTodoFeature() {
  const dispatch = useAppDispatch()
  const [todo, setTodo] = useState<Input>({
    title: '',
    label: ''
  })
  const onSubmit = () => {
    if (todo.title == "") {
      alert('you need to include todo title')
      return
    }
    const response = createTodo(todo.title!, todo.label)
    dispatch(todoAction.addTodo(response))
  }
  return (
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
            maxLength={MAX_LABEL_LENGTH}
          ></input>
          <small className="text-right">{todo.label?.length}/{MAX_LABEL_LENGTH}</small>
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form >
  )
}
