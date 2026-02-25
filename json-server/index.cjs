// json-server/index.cjs
const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')

const dbPath = path.resolve(__dirname, 'db.json')

const server = jsonServer.create()
const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults()

const readDb = () => {
  const data = fs.readFileSync(dbPath, 'UTF-8')
  return JSON.parse(data)
}

server.use(async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  next()
})

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body
    const db = readDb()
    const { users = [] } = db

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    )

    if (userFromBd) {
      return res.json(userFromBd)
    }

    return res.status(404).json({ message: 'User not found' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' })
  }
  next()
})

server.use(router)

server.listen(8000, () => {
  console.log('Server is running on 8000 port')
})
