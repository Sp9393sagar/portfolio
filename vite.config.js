import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const virtualHtmlPlugin = () => {
  return {
    name: 'virtual-html',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sagar Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
          `
          try {
            const transformedHtml = await server.transformIndexHtml(req.url, html)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(transformedHtml)
          } catch (e) {
            server.ssrFixStacktrace(e)
            next(e)
          }
          return
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), virtualHtmlPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
