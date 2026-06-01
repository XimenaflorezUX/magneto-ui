/**
 * Applies currentColor normalization to all SVGs under src/assets/icons/
 *
 * Usage: node .scripts/normalizeIconSvgsBatch.js
 */
const fs = require('fs')
const path = require('path')
const { normalizeIconSvg } = require('./normalizeIconSvg')

const ICONS_ROOT = path.resolve(__dirname, '../src/assets/icons')

const walk = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (entry.name.endsWith('.svg')) files.push(full)
  }
  return files
}

const run = () => {
  if (!fs.existsSync(ICONS_ROOT)) {
    console.error('Icons directory not found:', ICONS_ROOT)
    process.exit(1)
  }

  const files = walk(ICONS_ROOT)
  let updated = 0

  for (const file of files) {
    const before = fs.readFileSync(file, 'utf-8')
    const after = normalizeIconSvg(before)
    if (after !== before) {
      fs.writeFileSync(file, after, 'utf-8')
      updated++
    }
  }

  console.info(`✅ Normalized ${updated} / ${files.length} SVG files`)
}

run()
