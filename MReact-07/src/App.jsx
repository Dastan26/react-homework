import { useState } from 'react'
import courses from './data/courses.json'
import CourseListView from './CourseListView.jsx'

// Контейнер: владеет поиском и выбранным id, берёт данные и фильтрует их.
function CatalogContainer() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const q = query.trim().toLowerCase()
  const items = courses.filter((course) => course.title.toLowerCase().includes(q))
  const selected = courses.find((course) => course.id === selectedId)

  return (
    <section>
      <h2>Каталог (контейнер + представление)</h2>
      <label>
        Поиск <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <p>Выбран: {selected ? `${selected.title} (id: ${selected.id})` : 'ничего'}</p>
      <CourseListView
        items={items}
        emptyText={`По запросу «${query}» курсов нет`}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </section>
  )
}

// Представление отдельно, без контейнера: данные и callback заданы прямо здесь.
function ViewDemo() {
  const [calls, setCalls] = useState([])

  function handleSelect(id) {
    setCalls((prev) => [...prev, id])
  }

  return (
    <section>
      <h2>CourseListView отдельно</h2>
      <p>Вызовы onSelect: {calls.length ? calls.join(', ') : 'пока не было'}</p>
      <h3>Полный список</h3>
      <CourseListView items={courses} emptyText="Список пуст" onSelect={handleSelect} />
      <h3>Пустой массив</h3>
      <CourseListView items={[]} emptyText="Курсов пока нет" onSelect={handleSelect} />
    </section>
  )
}

export default function App() {
  return (
    <main>
      <h1>Контейнер каталога и представление</h1>
      <CatalogContainer />
      <ViewDemo />
    </main>
  )
}
