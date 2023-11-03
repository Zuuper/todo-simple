
import CreateTodoFeature from './components/features/CreateTodo'
import TodosFeature from './components/features/Todos'

function App() {

  return (
    <main className='w-screen h-screen py-4 md:py-12'>
      <h1 className='text-slate-900 leading-none text-2xl font-semibold text-center mb-8'>Todo List</h1>
      <div className='w-full max-w-xl mx-auto max-sm:px-4'>
        <CreateTodoFeature />
        <hr className='my-8' />
        <TodosFeature />
      </div>

    </main>
  )
}

export default App
