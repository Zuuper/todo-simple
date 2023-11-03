import { ComponentProps, useState } from "react";
import { Todo } from "../../interfaces/todo";
import { Chip } from "./Chip";
import { ButtonIcon } from "./Button";
import { PencilSquareIcon, CheckIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { deleteTodo, updateTodo } from "../../utils/todoStorage";
import { useAppDispatch } from "../../hooks/useStore";
import { todoAction } from "../../store/features/todoSlice";
import UpdateTodoFeature from "../features/UpdateTodo";

export interface TodoCardProps extends Omit<ComponentProps<'div'>, "id" | "title">, Todo { }
export const TodoCard: React.FC<TodoCardProps> = ({ title, createdAt, updatedAt, label, id, status, ...rest }) => {
  const dispatch = useAppDispatch()
  const [isEdited, setisEdited] = useState(false)

  const handleStatusTodo = () => {
    const updatedData: Todo = { title: title, label, id: id, createdAt, updatedAt, status: status === "active" ? 'non active' : "active" }
    const response = updateTodo(updatedData)
    if (!response.success) {
      dispatch(todoAction.init(response.data))
      return
    }
    dispatch(todoAction.updateTodo(response.data[0]))
    return
  }
  const handleDeleteTodo = () => {
    const response = deleteTodo(id)
    if (!response.success) return
    dispatch(todoAction.deleteTodo(id))
  }

  return <div className="border border-slate-400 rounded-lg p-4" {...rest}>
    {isEdited ? <>
      <UpdateTodoFeature initialTodo={{ title, createdAt, updatedAt, label, id, status }} setIsEdited={() => setisEdited(false)} />
    </> :

      <>
        <div className={`flex justify-between gap-4 ${status === 'active' ? 'text-slate-900' : 'text-slate-500'} items-start mb-2`}>
          <h4 className=" font-semibold w-8/12">
            {status === 'non active' ? "(non active)" : ""} {title}
          </h4>
          {label !== "" ?
            <Chip title={label} />
            :
            <></>
          }
        </div>
        <div className="flex gap-4 max-sm:justify-between text-slate-500 mb-4">
          <p className="text-xs">Created at: <span className="text-slate-900">{moment(createdAt).format('DD/MMM HH:mm')}</span></p>
          <p className="text-xs">Updated at: <span className="text-slate-900">{moment(updatedAt).format('DD/MMM HH:mm')}</span></p>
        </div>
        <div className="flex gap-2 items-center">
          {status === 'non active' ? <></> :
            <ButtonIcon onClick={() => setisEdited(true)}>
              <PencilSquareIcon className="w-6 h-6" />
            </ButtonIcon>
          }
          <ButtonIcon onClick={handleDeleteTodo} className="w-6 h-6 mr-2">
            <TrashIcon />
          </ButtonIcon>
          <ButtonIcon onClick={handleStatusTodo} className="w-6 h-6">
            {status === "active" ?
              <CheckIcon /> : <ArrowPathIcon />}
          </ButtonIcon>
        </div>
      </>
    }
  </div>
}


