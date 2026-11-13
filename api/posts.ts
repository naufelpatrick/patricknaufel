import type { IncomingMessage, ServerResponse } from 'node:http'
import { XMLParser } from 'fast-xml-parser'

const FEED_URL = 'https://patricknaufel.substack.com/feed'
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_', trimValues: true, processEntities: true })

type Post = { title: string; url: string; date: string; excerpt: string }
function cleanText(value: unknown): string {
  const raw = typeof value === 'string' ? value : ''
  return raw.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi,' ').replace(/\s+/g,' ').trim().slice(0, 230)
}
function safeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}
function postUrl(value: unknown): string | null {
  try {
    const uri = new URL(safeString(value))
    if (uri.protocol !== 'https:' || !['patricknaufel.substack.com','substack.com'].includes(uri.hostname)) return null
    return uri.toString()
  } catch { return null }
}
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600')
  if (req.method !== 'GET') {
    res.statusCode = 405
    return res.end(JSON.stringify({ error: 'Método não permitido' }))
  }
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6500)
    let response: Response
    try {
      response = await fetch(FEED_URL, { signal: controller.signal, headers: { Accept: 'application/rss+xml, application/xml, text/xml' } })
    } finally { clearTimeout(timeout) }
    if (!response.ok) throw new Error('RSS indisponível')
    const xml = await response.text()
    if (xml.length > 2_000_000) throw new Error('RSS excedeu o limite')
    const result = parser.parse(xml)
    const items = result?.rss?.channel?.item
    const entries = Array.isArray(items) ? items : items ? [items] : []
    const posts: Post[] = entries.map((item: Record<string, unknown>) => {
      const url = postUrl(item.link)
      const title = safeString(item.title)
      const dateRaw = safeString(item.pubDate)
      const time = Date.parse(dateRaw)
      return {
        title,
        url: url || '',
        date: Number.isFinite(time) ? new Date(time).toISOString() : '',
        excerpt: cleanText(item.description)
      }
    }).filter((p: Post) => p.title && p.url).slice(0, 6)
    res.statusCode = 200
    return res.end(JSON.stringify({ posts }))
  } catch {
    res.statusCode = 503
    return res.end(JSON.stringify({ error: 'Não foi possível consultar as publicações neste momento.', posts: [] }))
  }
}
