import React, { useEffect, useState } from 'react'

export type IconGlyphProps = {
  src: string
  className?: string
  style?: React.CSSProperties
  /** When true, uses mask + currentColor (default for registry SVGs). */
  inheritColor?: boolean
  'data-icon-name'?: string
  'data-icon-family'?: string
  'data-icon-size'?: string
  onError?: () => void
}

const isSvgSource = (src: string): boolean => /\.svg($|\?)/i.test(src)

/**
 * Renders an icon so it inherits `color` from the parent (currentColor).
 * SVG registry assets use CSS mask; non-SVG fall back to `<img>`.
 */
export const IconGlyph: React.FC<IconGlyphProps> = ({
  src,
  className,
  style,
  inheritColor = true,
  onError,
  ...dataAttrs
}) => {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
    if (!inheritColor || !isSvgSource(src)) return

    const probe = new Image()
    probe.onload = () => setFailed(false)
    probe.onerror = () => {
      setFailed(true)
      onError?.()
    }
    probe.src = src
  }, [inheritColor, onError, src])

  if (failed) return null

  const useMask = inheritColor && isSvgSource(src)
  const mergedClassName = [className, useMask ? 'magneto-ui-icon-glyph' : undefined].filter(Boolean).join(' ')

  if (!useMask) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden
        className={mergedClassName}
        style={style}
        loading="lazy"
        onError={() => {
          setFailed(true)
          onError?.()
        }}
        {...dataAttrs}
      />
    )
  }

  const maskStyle: React.CSSProperties = {
    ...style,
    ['--magneto-icon-mask-url' as string]: `url("${src}")`
  }

  return (
    <span
      role="presentation"
      aria-hidden
      className={mergedClassName}
      style={maskStyle}
      {...dataAttrs}
    />
  )
}
