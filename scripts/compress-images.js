import { readdir, stat, unlink } from "fs/promises"
import { join, extname, basename } from "path"
import sharp from "sharp"

const PUBLIC_DIR = "public"
const WEBP_THRESHOLD = 300 * 1024
const PNG_THRESHOLD = 100 * 1024
const MAX_DIMENSION = 1280
const COVER_MOBILE_WIDTH = 640

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  return (bytes / 1024).toFixed(1) + " KB"
}

async function processWebp(filePath, sizeBytes) {
  if (sizeBytes <= WEBP_THRESHOLD) {
    console.log(`  skip ${basename(filePath)} (${fmt(sizeBytes)}, under threshold)`)
    return
  }

  const buffer = await sharp(filePath)
    .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer()

  if (buffer.length >= sizeBytes) {
    console.log(`  keep ${basename(filePath)} (${fmt(sizeBytes)} → ${fmt(buffer.length)}, re-encode was larger)`)
    return
  }

  await sharp(buffer).toFile(filePath)
  const pct = ((1 - buffer.length / sizeBytes) * 100).toFixed(1)
  console.log(`  ✓ ${basename(filePath)}: ${fmt(sizeBytes)} → ${fmt(buffer.length)} (-${pct}%)`)
}

async function processPng(filePath, sizeBytes) {
  if (sizeBytes <= PNG_THRESHOLD) {
    console.log(`  skip ${basename(filePath)} (${fmt(sizeBytes)}, under threshold)`)
    return
  }

  const outPath = filePath.replace(/\.png$/i, ".webp")
  await sharp(filePath)
    .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath)

  const newStat = await stat(outPath)
  const pct = ((1 - newStat.size / sizeBytes) * 100).toFixed(1)
  console.log(`  ✓ ${basename(filePath)} → ${basename(outPath)}: ${fmt(sizeBytes)} → ${fmt(newStat.size)} (-${pct}%)`)
}

async function generateCoverMobile() {
  const src = join(PUBLIC_DIR, "Cover.webp")
  const dst = join(PUBLIC_DIR, "Cover-640.webp")
  await sharp(src)
    .resize(COVER_MOBILE_WIDTH, null, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(dst)
  const s = await stat(dst)
  console.log(`  ✓ Cover-640.webp generated: ${fmt(s.size)}`)
}

async function main() {
  const files = await readdir(PUBLIC_DIR)

  console.log(`\n=== WebP files (threshold > ${fmt(WEBP_THRESHOLD)}) ===`)
  for (const file of files.sort()) {
    if (extname(file).toLowerCase() !== ".webp") continue
    const filePath = join(PUBLIC_DIR, file)
    const s = await stat(filePath)
    await processWebp(filePath, s.size)
  }

  console.log(`\n=== PNG files (threshold > ${fmt(PNG_THRESHOLD)}) ===`)
  for (const file of files.sort()) {
    if (extname(file).toLowerCase() !== ".png") continue
    const filePath = join(PUBLIC_DIR, file)
    const s = await stat(filePath)
    await processPng(filePath, s.size)
  }

  console.log(`\n=== Cover mobile variant ===`)
  await generateCoverMobile()

  console.log("\nDone.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
