const express = require('express')
const app = express()

const cors = require('cors')

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  })
)

app.get('/article', (req, res) => {
  res.json({ title: '', tags: '' })
})

app.listen(3333)
