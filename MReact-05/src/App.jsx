import { useRef, useState } from 'react'
import courses from './data/courses.json'
import Panel from './Panel.jsx'

const CATEGORIES = { all: 'Все', frontend: 'Frontend', fullstack: 'Fullstack', quality: 'Quality' }

function CourseCard({ course, selected, onSelect }) {
  // Решение «есть ли действие» принимается здесь, а не внутри Panel.
  const actions =
    course.seats > 0 ? (
      <button onClick={() => onSelect(course.id)} aria-pressed={selected}>
        {selected ? 'Выбран' : 'Выбрать'}
      </button>
    ) : null

  return (
    <Panel title={course.title} actions={actions}>
      <p>Категория: {CATEGORIES[course.category]}</p>
      <p>{course.seats > 0 ? `Свободных мест: ${course.seats}` : 'Мест нет'}</p>
    </Panel>
  )
}

function CategoryFilter({ value, onChange }) {
  const selectRef = useRef(null)

  function handleReset() {
    onChange('all')
    // Кнопка «Сбросить» исчезнет, поэтому возвращаем фокус в поле, а не теряем его на body.
    selectRef.current.focus()
  }

  const actions = value !== 'all' ? <button onClick={handleReset}>Сбросить</button> : null

  return (
    <Panel title="Фильтр" actions={actions}>
      <label>
        Категория{' '}
        <select ref={selectRef} value={value} onChange={(e) => onChange(e.target.value)}>
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </label>
    </Panel>
  )
}

export default function App() {
  const [category, setCategory] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const visible = courses.filter((course) => category === 'all' || course.category === category)

  return (
    <main>
      <h1>Каталог курсов</h1>
      <CategoryFilter value={category} onChange={setCategory} />
      <ul className="cards">
        {visible.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} selected={course.id === selectedId} onSelect={setSelectedId} />
          </li>
        ))}
      </ul>
    </main>
  )
}
