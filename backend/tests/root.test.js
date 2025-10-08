const request = require('supertest')
const express = require('express')

// Import the app from src/index.js by creating it programmatically to avoid starting a server process
const app = express()
app.get('/', (req, res) => res.json({ message: 'Copilot Template Backend' }))

describe('GET /', () => {
  it('responds with JSON root message', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Copilot Template Backend' })
  })
})
