export interface IBarLoader {
  className?: string
  /** CSS color for the fill. Defaults to `$color-blue-dark-400` via token. */
  color?: string
  /** 0–100. When set, bar shows determinate progress; when omitted, indeterminate animation. */
  percent?: number
  /** Accessible name for the progressbar. */
  'aria-label'?: string
}

/** @deprecated Use `IBarLoader` — kept for backward compatibility. */
export type IBardLoader = IBarLoader
