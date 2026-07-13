import { createFileRoute } from '@tanstack/react-router'
import ToDoList from './ToDoList'

export const Route = createFileRoute('/day6/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ToDoList
        todos={[
          { id: 1, text: 'buy milk', status: 'to-do' },
          { id: 2, text: 'wash bike', status: 'in-progress' },
          { id: 3, text: 'do the budget', status: 'done' },
          { id: 4, text: 'call jane', status: 'to-do' },
        ]}
      />
    </div>
  )
}
