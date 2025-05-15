/** Liefert eine URL, die sowohl lokal (vite dev) als auch auf GitHub Pages stimmt */
export const asset = (p: string) => {
  const base = import.meta.env.BASE_URL // "/"  oder "/tradicoes‑…/"
  if (p.startsWith('http') || p.startsWith(base)) return p // nichts zu tun
  return `${base}${p.replace(/^\/+/, '')}` // vorn evtl. Slash kappen
}
