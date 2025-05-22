const fs = require('fs')
const path = require('path')

const now = new Date().toISOString().split('T')[0]
const envPath = path.resolve(__dirname, '.env.local')

const currentContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''
const newContent = `VITE_DATE_MODIFIED=${now}\n`

if (currentContent !== newContent) {
  fs.writeFileSync(envPath, newContent)
  console.log(`🕒 VITE_DATE_MODIFIED gesetzt: ${now}`)
} else {
  console.log(`ℹ️ VITE_DATE_MODIFIED bereits aktuell (${now}) – keine Änderung nötig`)
}
