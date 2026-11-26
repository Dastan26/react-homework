import { useId } from 'react'

// Универсальная рамка: заголовок, содержимое и необязательная область действий.
// Что внутри — решает тот, кто использует Panel.
export default function Panel({ title, children, actions }) {
  const titleId = useId()

  return (
    <section className="panel" aria-labelledby={titleId}>
      <h2 id={titleId} className="panel-title">{title}</h2>
      <div className="panel-body">{children}</div>
      {actions && <div className="panel-actions">{actions}</div>}
    </section>
  )
}
