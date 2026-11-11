import { useEffect, useRef } from 'react'

let observersCount = 0

export default function CourseTitle({ title, onMutation, onObserversChange }) {
  console.log('render CourseTitle', title)

  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    const observer = new MutationObserver((records) => {
      records.forEach((record) => onMutation(record.type, node.textContent))
    })
    observer.observe(node, { childList: true, characterData: true, subtree: true, attributes: true })
    observersCount++
    console.log('observer connected', observersCount)
    onObserversChange(observersCount)

    return () => {
      observer.disconnect()
      observersCount--
      console.log('observer disconnected', observersCount)
      onObserversChange(observersCount)
    }
  }, [onMutation, onObserversChange])

  return (
    <p className="child" ref={ref}>
      {title}
    </p>
  )
}
