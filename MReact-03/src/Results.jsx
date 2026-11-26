import { memo, useLayoutEffect } from 'react'
import { markListCommit } from './timing.js'

const items = Array.from({ length: 240 }, (_, i) => ({
  id: String(i),
  title: ['React', 'CSS', 'TypeScript'][i % 3] + ' ' + i,
}))

// Искусственная нагрузка в каждой карточке, как в базовом примере.
function CourseCard({ item, query }) {
  let checksum = item.id.length + query.length
  for (let i = 0; i < 80000; i++) checksum = (Math.imul(checksum, 31) + i) | 0
  return <li>{item.title} — {checksum}</li>
}

// Граница memo: при срочном обновлении text список не пересчитывается,
// пока listQuery тот же.
const Results = memo(function Results({ query }) {
  const found = items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))

  useLayoutEffect(() => {
    markListCommit()
  }, [query])

  return (
    <section>
      <p>
        Список для запроса: «<b data-testid="list-query">{query}</b>», найдено: {found.length}
      </p>
      <ul>
        {found.map((item) => (
          <CourseCard key={item.id} item={item} query={query} />
        ))}
      </ul>
    </section>
  )
})

export default Results
