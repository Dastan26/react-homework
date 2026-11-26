import Panel from './Panel.jsx'

// Представление: показывает только то, что получило через props.
// Не импортирует courses.json, не читает localStorage, не хранит state.
export default function CourseListView({ items, emptyText, onSelect, selectedId = null }) {
  if (items.length === 0) return <p className="empty">{emptyText}</p>

  return (
    <ul className="cards">
      {items.map((course) => {
        const selected = course.id === selectedId
        return (
          <li key={course.id}>
            <Panel
              title={course.title}
              actions={
                <button type="button" aria-pressed={selected} onClick={() => onSelect(course.id)}>
                  {selected ? 'Выбран' : 'Выбрать'}
                </button>
              }
            >
              <p>Категория: {course.category}</p>
              <p>Мест: {course.seats}</p>
            </Panel>
          </li>
        )
      })}
    </ul>
  )
}
