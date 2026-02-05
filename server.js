import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = process.env.PORT || 5001
const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/manchester_seals'

app.use(cors())
app.use(express.json())

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return
  }

  await mongoose.connect(mongoUri, {
    dbName: 'manchester_seals',
  })
}

app.get('/api/health', async (_req, res) => {
  try {
    await connectMongo()
    res.json({ status: 'ok' })
  } catch (error) {
    res.status(500).json({ error: 'MongoDB connection failed' })
  }
})

app.get('/api/roster', async (_req, res) => {
  try {
    await connectMongo()
    const roster = await mongoose.connection
      .collection('roster')
      .find({})
      .toArray()

    res.json({ data: roster })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roster' })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
