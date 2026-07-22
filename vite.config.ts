import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = path.resolve(__dirname, 'src/data')
const UPLOADS_DIR = path.resolve(__dirname, 'public/uploads')
const ALLOWED_RESOURCES = new Set([
  'projects',
  'skills',
  'experience',
  'education',
  'about',
])

function readBody(req: import('http').IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

// Dev-only local API so the /dashboard admin UI can write directly to
// src/data/*.json and public/uploads/ — this middleware never ships in the
// production build, so the deployed site stays fully static.
function localContentApi(): Plugin {
  return {
    name: 'local-content-api',
    apply: 'serve',
    configureServer(server) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true })

      server.middlewares.use('/api/content/', async (req, res) => {
        const resource = (req.url ?? '').replace(/^\//, '').replace(/\/$/, '')

        if (req.method !== 'POST' || !ALLOWED_RESOURCES.has(resource)) {
          res.statusCode = 404
          res.end('Not found')
          return
        }

        try {
          const body = await readBody(req)
          JSON.parse(body) // validate before writing
          fs.writeFileSync(path.join(DATA_DIR, `${resource}.json`), body)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
        } catch (err) {
          res.statusCode = 500
          res.end(String(err))
        }
      })

      server.middlewares.use('/api/upload', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 404
          res.end('Not found')
          return
        }

        try {
          const body = await readBody(req)
          const { fileName, dataUrl } = JSON.parse(body) as {
            fileName: string
            dataUrl: string
          }
          const match = /^data:(.+);base64,(.+)$/.exec(dataUrl)
          if (!match) throw new Error('Invalid data URL')

          const buffer = Buffer.from(match[2], 'base64')
          const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
          const finalName = `${Date.now()}-${safeName}`
          fs.writeFileSync(path.join(UPLOADS_DIR, finalName), buffer)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ url: `/uploads/${finalName}` }))
        } catch (err) {
          res.statusCode = 500
          res.end(String(err))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localContentApi()],
})
