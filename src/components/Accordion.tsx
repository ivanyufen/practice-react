import { useCallback, useState } from 'react'
import './Accordion.css'

interface Item {
  title: string
  content: string
}

interface AccordionProps {
  items: Item[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openedIndexes, setOpenedIndexes] = useState<number[]>([])

  const handleClick = useCallback((isVisible: boolean, index: number) => {
    setOpenedIndexes((prev) =>
      isVisible ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }, [])

  if (!items || items?.length === 0) return null

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isVisible = openedIndexes.includes(index)
        return (
          <div key={index} className="accordion-item">
            <button
              className="accordion-header"
              onClick={() => handleClick(isVisible, index)}
              aria-expanded={isVisible}
            >
              <span>{item.title}</span>
              <span className="accordion-icon">{isVisible ? '−' : '+'}</span>
            </button>
            <div className={`accordion-panel ${isVisible ? 'isOpen' : ''}`}>
              <div className="accordion-content">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
