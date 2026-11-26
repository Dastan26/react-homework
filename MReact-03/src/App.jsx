import { useLayoutEffect, useState, useTransition } from 'react'
import Results from './Results.jsx'
import { markEvent, markInputCommit, resetStats } from './timing.js'

export default function Search() {
  const [mode, setMode] = useState('transition')
  const [text, setText] = useState('')
  const [listQuery, setListQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    const value = e.target.value
    markEvent(e.timeStamp)
    // Управляемый input всегда обновляется срочно, вне transition.
    setText(value)
    if (mode === 'transition') {
      startTransition(() => setListQuery(value))
    } else {
      setListQuery(value)
    }
  }

  function handleMode(e) {
    setMode(e.target.value)
    resetStats()
  }

  useLayoutEffect(() => {
    markInputCommit()
  }, [text])

  return (
    <main>
      <h1>Поиск: обычный режим и useTransition</h1>

      <fieldset>
        <legend>Режим</legend>
        <label>
          <input type="radio" name="mode" value="normal" checked={mode === 'normal'} onChange={handleMode} />
          Обычный (оба state срочно)
        </label>
        <label>
          <input type="radio" name="mode" value="transition" checked={mode === 'transition'} onChange={handleMode} />
          Transition (listQuery в startTransition)
        </label>
      </fieldset>

      <label>
        Поиск <input value={text} onChange={handleChange} autoFocus />
      </label>
      <span className="pending">{isPending ? 'Список обновляется…' : 'Список готов'}</span>

      <p id="stats" className="stats">Начните печатать, чтобы увидеть замеры.</p>
      <button onClick={resetStats}>Сбросить замеры</button>

      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        <Results query={listQuery} />
      </div>
    </main>
  )
}
