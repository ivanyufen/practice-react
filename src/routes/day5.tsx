import { getArticles } from '#/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/day5')({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })
  const { data, isLoading } = query
  if (isLoading) return <h1>Loading 10 articles....</h1>
  if (data && data?.length) {
    return (
      <ol>
        {data.map((item) => (
          <li>
            <a href={item.url} target="_blank">
              <p>{item.url}</p>
            </a>
            <p>
              {item.score} by {item.by}
            </p>
          </li>
        ))}
      </ol>
    )
  }
  return null
}
