const fs = require('fs')
const path = require('path')

const EXCLUDE = ['node_modules', 'dist', '.git', 'build', 'out']
const MAX_DEPTH = 50 // praktisch unendlich, aber Sicherheitslimit

function printTree(dir, prefix = '', depth = 0) {
  if (depth > MAX_DEPTH) return

  const items = fs
    .readdirSync(dir)
    .filter((name) => !EXCLUDE.includes(name))
    .sort((a, b) => {
      const aIsDir = fs.statSync(path.join(dir, a)).isDirectory()
      const bIsDir = fs.statSync(path.join(dir, b)).isDirectory()
      return aIsDir === bIsDir ? a.localeCompare(b) : bIsDir - aIsDir
    })

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item)
    const stats = fs.statSync(fullPath)
    const isLast = index === items.length - 1
    const branch = isLast ? '└── ' : '├── '
    const newPrefix = prefix + (isLast ? '    ' : '│   ')

    const icon = stats.isDirectory() ? '📁' : '📄'
    console.log(`${prefix}${branch}${icon} ${item}`)

    if (stats.isDirectory()) {
      printTree(fullPath, newPrefix, depth + 1)
    }
  })
}

printTree('.')
