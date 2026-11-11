export default function CourseCard({ course, selected, onSelect }) {
  return (
    <li className="card">
      <h3>{course.title}</h3>
      <button onClick={() => onSelect(course.id)} disabled={selected}>
        {selected ? 'Выбран' : 'Выбрать'}
      </button>
    </li>
  )
}
