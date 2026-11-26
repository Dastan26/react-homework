import { useDeferredValue, useLayoutEffect, useState, useTransition } from 'react'
import Results from './Results.jsx'
import { markEvent, markInputCommit, resetStats } from './timing.js'

const MODES = {
  normal: 'Обычный (оба state срочно)',
  transition: 'Transition (listQuery в startTransition)',
  deferred: 'Deferred (text и useDeferredValue(text))',
}

export default function Search() {
  const [mode, setMode] = useState('deferred')
  const [text, setText] = useState('')
  const [listQuery, setListQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredText = useDeferredValue(text)

  // В режиме deferred второй state не нужен: список получает только отложенную копию text.
  const resultsQuery = mode === 'deferred' ? deferredText : listQuery
  const isStale = mode === 'deferred' && text !== deferredText

  function handleChange(e) {
    const value = e.target.value
    markEvent(e.timeStamp)
    // Управляемый input всегда обновляется срочно, вне transition.
    setText(value)
    if (mode === 'transition') {
      startTransition(() => setListQuery(value))
    } else if (mode === 'normal') {
      setListQuery(value)
    }
  }

  function handleMode(e) {
    setMode(e.target.value)
    setText('')
    setListQuery('')
    resetStats()
  }

  useLayoutEffect(() => {
    markInputCommit()
  }, [text])

  let status = ''
  if (mode === 'transition') status = isPending ? 'Список обновляется…' : 'Список готов'
  if (mode === 'deferred') status = isStale ? 'Обновляем результаты' : 'Результаты актуальны'

  return (
    <main>
      <h1>Поиск: обычный режим, useTransition и useDeferredValue</h1>

      <fieldset>
        <legend>Режим</legend>
        {Object.entries(MODES).map(([value, label]) => (
          <label key={value}>
            <input type="radio" name="mode" value={value} checked={mode === value} onChange={handleMode} />
            {label}
          </label>
        ))}
      </fieldset>

      <label>
        Поиск <input value={text} onChange={handleChange} autoFocus />
      </label>
      <span className="pending">{status}</span>

      <p id="stats" className="stats">Начните печатать, чтобы увидеть замеры.</p>
      <button onClick={resetStats}>Сбросить замеры</button>

      <div style={{ opacity: isPending || isStale ? 0.5 : 1 }}>
        <Results query={resultsQuery} />
      </div>
    </main>
  )
}
