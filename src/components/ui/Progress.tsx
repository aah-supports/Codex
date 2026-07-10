type ProgressProps = {
  value: number
  label: string
}

export function Progress({ value, label }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="progress-block">
      <div className="progress-label">
        <span>{label}</span>
        <span>{Math.round(safeValue)} %</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}
