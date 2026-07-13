import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const router = useRouter()

  return (
    <div className="p-8">
      <h1>28 Days of React Practice</h1>
      <ul style={{ marginTop: 20, fontSize: '1.25rem' }}></ul>
      {Object.values(router.routesByPath).map((item) => {
        if (item.path === '/') return

        return (
          <li key={item.path}>
            <Link to={item.path}>{item.path}</Link>
          </li>
        )
      })}
    </div>
  )
}
