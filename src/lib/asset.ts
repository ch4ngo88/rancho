export const asset = (p: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const cleanedPath = p.replace(/^\/+/, '')

  // Wenn es schon die vollständige URL ist – durchlassen
  if (p.startsWith('http') || p.startsWith(base)) return p

  return `${base}/${cleanedPath}`
}
