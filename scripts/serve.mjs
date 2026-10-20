#!/usr/bin/env node
/**
 * Servidor estático simples para desenvolvimento local.
 *
 * Uso: npm run dev  (http://localhost:5173)
 *
 * Não é necessário para publicar: o site é estático e pode ser servido
 * diretamente pelo GitHub Pages.
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const PORT = Number(process.env.PORT ?? 5173)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`)
    let pathname = decodeURIComponent(url.pathname)
    if (pathname.endsWith('/')) pathname += 'index.html'

    const filePath = join(ROOT, normalize(pathname).replace(/^(\.\.[/\\])+/, ''))
    if (!filePath.startsWith(ROOT)) {
      response.writeHead(403).end('Acesso negado')
      return
    }

    const info = await stat(filePath).catch(() => null)
    if (!info || !info.isFile()) {
      // Rotas de aplicação (hash) são resolvidas pelo index.html.
      const fallback = await readFile(join(ROOT, 'index.html'))
      response.writeHead(200, { 'Content-Type': MIME['.html'] }).end(fallback)
      return
    }

    const content = await readFile(filePath)
    const type = MIME[extname(filePath)] ?? 'application/octet-stream'
    response.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/',
    })
    response.end(content)
  } catch (error) {
    response.writeHead(500).end(`Erro interno: ${error.message}`)
  }
})

server.listen(PORT, () => {
  console.log(`BioLab rodando em http://localhost:${PORT}`)
})
