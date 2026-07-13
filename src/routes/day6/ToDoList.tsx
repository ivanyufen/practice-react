import { useMemo, useState } from 'react'
import {
  DragDropProvider,
  DragOverlay,
  useDraggable,
  useDroppable,
} from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { CollisionPriority } from '@dnd-kit/abstract'
import { move } from '@dnd-kit/helpers'

interface ToDoProps {
  id: number
  text: string
  status: string
}
interface ToDoListProps {
  todos: ToDoProps[]
}
interface ToDoItem {
  id: number
  text: string
}

const LABEL_ENUM = {
  'to-do': 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}

const Column = ({ children, id }) => {
  console.log({ id, children })
  const { isDropTarget, ref } = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  })
  const style: React.CSSProperties = {
    border: '1px solid gray',
    padding: 20,
    height: 500,
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    // background: isDropTarget ? '#00000030' : undefined,
  }

  return (
    <div>
      <p>{LABEL_ENUM[id]}</p>
      <div className="Column" ref={ref} style={style}>
        {children}
      </div>
    </div>
  )
}
const Item = ({ id, index, column, text }) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: column,
  })

  return (
    <button
      className="Item"
      ref={ref}
      data-dragging={isDragging}
      style={{ width: '100%' }}
    >
      {text}
    </button>
  )
}

export default function ToDoList(props: ToDoListProps) {
  const { todos } = props

  const generateUniqueNumericId = (): number => {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    return array[0]
  }

  const initialItems = useMemo(() => {
    const transformedTodos = todos.reduce<Record<string, ToDoItem[]>>(
      (acc, curr) => {
        if (!acc[curr.status]) {
          acc[curr.status] = []
        }

        acc[curr.status].push({ id: curr.id, text: curr.text })

        return acc
      },
      {},
    )
    return transformedTodos
  }, [])

  const [items, setItems] = useState<Record<string, ToDoItem[]>>({
    ...initialItems,
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())
    const newToDoText = String(formValues.newToDo || '')

    setItems((prev) => ({
      ...prev,
      'to-do': [
        ...(prev['to-do'] || []),
        { id: generateUniqueNumericId(), text: newToDoText },
      ],
    }))

    e.currentTarget.reset()
  }

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      <h1>To Do List</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: 10, width: '100%' }}
        >
          <input
            name="newToDo"
            placeholder="What are you going to do?"
            style={{ width: '100%' }}
            required
          />

          <button type="submit">Add</button>
        </form>
      </div>
      <DragDropProvider
        onDragOver={(event) => {
          setItems((items) => move(items, event))
        }}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          {Object.entries(items).map(([column, items]) => {
            return (
              <Column key={column} id={column}>
                {items.map((item, index) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    index={index}
                    column={column}
                    text={item.text}
                  />
                ))}
              </Column>
            )
          })}
        </div>
      </DragDropProvider>
    </div>
  )
}
