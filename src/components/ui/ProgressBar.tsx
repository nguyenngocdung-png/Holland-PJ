interface ProgressBarProps {
  value: number // 0~100
  label?: string
  color?: string
}

export default function ProgressBar({ value, label, color }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      aria-label={label}
    >
      <div className="progress__fill" style={{ width: `${v}%`, ...(color ? { background: color } : {}) }} />
    </div>
  )
}
