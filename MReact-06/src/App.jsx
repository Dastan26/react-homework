import { useRef, useState } from 'react'
import courses from './data/courses.json'
import Panel from './Panel.jsx'

function filterCourses(query) {
  const q = query.trim().toLowerCase()
  return courses.filter((course) => course.title.toLowerCase().includes(q))
}

function CourseList({ query }) {
  const found = filterCourses(query)
  if (found.length === 0) return <p>Ничего не найдено</p>
  return (
    <ul>
      {found.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  )
}

// Управляемый: значение input хранится в state React, input только показывает его.
function ControlledFilter() {
  const [query, setQuery] = useState('')

  function handleReset() {
    setQuery('')
  }

  return (
    <Panel
      title="Управляемый фильтр (value + onChange)"
      actions={<button type="button" onClick={handleReset}>Сбросить</button>}
    >
      <label>
        Название <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <p>Значение в state: «{query}»</p>
      <CourseList query={query} />
    </Panel>
  )
}

// Неуправляемый: текущее значение хранит DOM, React задаёт только начальное.
function UncontrolledFilter() {
  const inputRef = useRef(null)
  const [applied, setApplied] = useState('')

  function handleApply(e) {
    e.preventDefault()
    setApplied(inputRef.current.value)
  }

  function handleReset() {
    // React не владеет текущим значением, поэтому очищаем DOM явно через ref.
    inputRef.current.value = ''
    setApplied('')
    inputRef.current.focus()
  }

  return (
    <Panel
      title="Неуправляемый фильтр (defaultValue + ref)"
      actions={<button type="button" onClick={handleReset}>Сбросить</button>}
    >
      <form onSubmit={handleApply}>
        <label>
          Название <input ref={inputRef} defaultValue="" />
        </label>{' '}
        <button type="submit">Применить</button>
      </form>
      <p>Применённый запрос: «{applied}»</p>
      <CourseList query={applied} />
    </Panel>
  )
}

export default function App() {
  return (
    <main>
      <h1>Управляемый и неуправляемый фильтр</h1>
      <ControlledFilter />
      <UncontrolledFilter />
    </main>
  )
}
