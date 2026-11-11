import { useState } from 'react'
import courses from './data/courses.json'
import CourseCard from './CourseCard.jsx'

const STORAGE_KEY = 'selected-course'

export default function App() {
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [renders, setRenders] = useState(0)

  const handleSelect = (id) => {
    localStorage.setItem(STORAGE_KEY, id)
    setSelectedId(id)
  }

  return (
    <main>
      <h1>Выбор курса</h1>

      <ul className="cards">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selected={course.id === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </ul>

      <p>В localStorage: {selectedId ?? 'пусто'}</p>
      <button onClick={() => setRenders(renders + 1)}>Перерисовать ({renders})</button>
    </main>
  )
}
