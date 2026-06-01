export interface IBarChart {
  /** Salary or value range `[min, max]` shown in the popover. */
  bin: number[]
  /** Bar height as a fraction of `maxPercentage` (0–1). */
  heightPercentage: number
  /** Label suffix in the popover (e.g. "empleos"). */
  jobText: string
  /** Denominator for height calculation. Defaults to `1`. */
  maxPercentage?: number
  /** Maximum bar height in pixels (dynamic layout). Defaults to `400`. */
  maxHeight?: number
  /** Top marker color (CSS). Defaults to `$color-blue-light-400` via SCSS. */
  point?: string
}
