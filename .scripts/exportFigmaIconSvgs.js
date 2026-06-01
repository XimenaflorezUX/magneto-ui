/**
 * Exports SVG assets from Figma into src/assets/icons/{family}/{name}.svg
 *
 * Requires FIGMA_ACCESS_TOKEN (Personal access token with file read scope)
 * https://www.figma.com/developers/api#access-tokens
 *
 * Usage:
 *   set FIGMA_ACCESS_TOKEN=figd_...
 *   node .scripts/exportFigmaIconSvgs.js
 *   node .scripts/exportFigmaIconSvgs.js --family=tabler
 */
require('dotenv').config({ path: '.env.local' })
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const https = require('https')

const ROOT = path.resolve(__dirname, '..')
const MANIFEST_DIR = path.join(ROOT, 'src/shared/icons/manifest')
const ASSETS_DIR = path.join(ROOT, 'src/assets/icons')
const FIGMA_FILE_KEY = 'u1kcWn7lev6qcjJnUSbOMk'
const BATCH_SIZE = 80

const token = process.env.FIGMA_ACCESS_TOKEN?.trim()

const getArg = (key) => {
  const arg = process.argv.find((a) => a.startsWith(`--${key}=`))
  return arg ? arg.split('=')[1] : undefined
}

const fetchJson = (url) =>
  new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { 'X-Figma-Token': token } },
      (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject(e)
          }
        })
      }
    )
    req.on('error', reject)
  })

const downloadFile = (url, dest) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return downloadFile(res.headers.location, dest).then(resolve).catch(reject)
        }
        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => file.close(resolve))
      })
      .on('error', reject)
  })

const { normalizeIconSvg } = require('./normalizeIconSvg')

const chunk = (arr, size) => {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

const writeNormalizedSvg = (dest, rawSvg) => {
  fs.writeFileSync(dest, normalizeIconSvg(rawSvg), 'utf-8')
}

const exportFamily = async (family) => {
  const manifestPath = path.join(MANIFEST_DIR, `${family}.json`)
  if (!fs.existsSync(manifestPath)) {
    console.warn(`Skip ${family}: no manifest`)
    return
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const outDir = path.join(ASSETS_DIR, family)
  fs.mkdirSync(outDir, { recursive: true })

  const pending = manifest.filter((entry) => !fs.existsSync(path.join(outDir, `${entry.name}.svg`)))
  console.info(`Exporting ${family}: ${pending.length} / ${manifest.length} icons`)

  for (const batch of chunk(pending, BATCH_SIZE)) {
    const ids = batch.map((e) => e.nodeId).join(',')
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`
    const { err, images } = await fetchJson(url)

    if (err) {
      console.error(`Figma API error (${family}):`, err)
      continue
    }

    for (const entry of batch) {
      const imageUrl = images?.[entry.nodeId]
      if (!imageUrl) {
        console.warn(`  ✗ no URL: ${entry.name} (${entry.nodeId})`)
        continue
      }
      const dest = path.join(outDir, `${entry.name}.svg`)
      const tmpDest = `${dest}.tmp`
      await downloadFile(imageUrl, tmpDest)
      const raw = fs.readFileSync(tmpDest, 'utf-8')
      writeNormalizedSvg(dest, raw)
      fs.unlinkSync(tmpDest)
    }

    await new Promise((r) => setTimeout(r, 350))
  }
}

const run = async () => {
  if (!token) {
    console.error('FIGMA_ACCESS_TOKEN is required. Set it in .env or your shell.')
    process.exit(1)
  }

  const onlyFamily = getArg('family')
  const families = onlyFamily
    ? [onlyFamily]
    : ['iconsax-outline', 'iconsax-bold', 'tabler', 'lucide']

  for (const family of families) {
    await exportFamily(family)
  }

  console.info('✅ SVG export complete — run: yarn sync:icons:manifest')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
