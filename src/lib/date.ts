export function nowIso() {
  return new Date().toISOString()
}

export function formatPercent(value: number) {
  return `${Math.round(value)} %`
}
