import { createFileRoute } from '@tanstack/react-router'
import MemoryGame from './MemoryGame'

export const Route = createFileRoute('/day4/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div
      style={{
        marginTop: 50,
        width: '80%',
        margin: 'auto',
      }}
    >
      <MemoryGame
        images={[
          'https://images.unsplash.com/photo-1626808642875-0aa545482dfb',
          'https://images.unsplash.com/photo-1546842931-886c185b4c8c',
          'https://images.unsplash.com/photo-1520763185298-1b434c919102',
          'https://images.unsplash.com/photo-1442458017215-285b83f65851',
          'https://images.unsplash.com/photo-1496483648148-47c686dc86a8',
          'https://images.unsplash.com/photo-1591181520189-abcb0735c65d',
        ]}
      />
    </div>
  )
}
