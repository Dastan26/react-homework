// Замеры пишутся прямо в DOM, а не в state, чтобы не вызывать лишних render
// и не искажать то, что меряем.
let eventTime = 0
let stats = empty()

function empty() {
  return { keys: 0, inputMax: 0, inputSum: 0, inputLast: 0, listCommits: 0, listLast: 0 }
}

function show() {
  const el = document.getElementById('stats')
  if (!el) return
  const avg = stats.keys ? stats.inputSum / stats.keys : 0
  el.textContent =
    `Нажатий: ${stats.keys}. Ввод → commit поля: последний ${stats.inputLast.toFixed(1)} мс, ` +
    `средний ${avg.toFixed(1)} мс, максимум ${stats.inputMax.toFixed(1)} мс. ` +
    `Commit списка: ${stats.listCommits}, последний через ${stats.listLast.toFixed(1)} мс после события.`
}

export function markEvent(timeStamp) {
  eventTime = timeStamp
}

export function markInputCommit() {
  if (!eventTime) return
  const lag = performance.now() - eventTime
  stats.keys++
  stats.inputLast = lag
  stats.inputSum += lag
  stats.inputMax = Math.max(stats.inputMax, lag)
  show()
}

export function markListCommit() {
  if (!eventTime) return
  stats.listCommits++
  stats.listLast = performance.now() - eventTime
  show()
}

export function resetStats() {
  eventTime = 0
  stats = empty()
  show()
}
