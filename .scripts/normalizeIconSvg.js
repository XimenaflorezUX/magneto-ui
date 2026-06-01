/**
 * Normalizes exported Figma SVGs so fills/strokes use currentColor (inherits parent text color).
 */
const HEX_COLOR = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g
const RGB_COLOR = /\b(?:rgb|rgba)\([^)]+\)/gi

const replacePaintValues = (svg) =>
  svg
    .replace(/\bfill="(?!none|currentColor)[^"]*"/gi, 'fill="currentColor"')
    .replace(/\bstroke="(?!none|currentColor)[^"]*"/gi, 'stroke="currentColor"')
    .replace(/\bfill:\s*(?!none|currentColor)[^;"']+/gi, 'fill:currentColor')
    .replace(/\bstroke:\s*(?!none|currentColor)[^;"']+/gi, 'stroke:currentColor')

/**
 * @param {string} svgRaw
 * @returns {string}
 */
const normalizeIconSvg = (svgRaw) => {
  if (!svgRaw || !svgRaw.includes('<svg')) return svgRaw

  let svg = svgRaw.replace(HEX_COLOR, 'currentColor').replace(RGB_COLOR, 'currentColor')
  svg = replacePaintValues(svg)

  return svg
}

module.exports = { normalizeIconSvg }
