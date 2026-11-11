import { useCallback, useState } from 'react'
import courses from './data/courses.json'
import CourseTitle from './CourseTitle.jsx'

export default function App() {
  const [count, setCount] = useState(0)
  const [index, setIndex] = useState(0)
  const [childKey, setChildKey] = useState(0)
  const [mutations, setMutations] = useState([])
  const [observers, setObservers] = useState(0)

  const addMutation = useCallback((type, text) => {
    setMutations((prev) => [...prev, `${type}: ${text}`])
  }, [])

  return (
    <main>
      <h1>Render и commit</h1>

      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setIndex((index + 1) % courses.length)}>Сменить title</button>
      <button onClick={() => setChildKey(childKey + 1)}>Перемонтировать</button>
      <button onClick={() => setMutations([])}>Очистить</button>

      <CourseTitle
        key={childKey}
        title={courses[index].title}
        onMutation={addMutation}
        onObserversChange={setObservers}
      />

      <p>Подписок: {observers}</p>
      <p>Изменений DOM: {mutations.length}</p>
      <ol>
        {mutations.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ol>
    </main>
  )
}
