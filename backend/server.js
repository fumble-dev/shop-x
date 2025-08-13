import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectToDb from './config/mongodb.js'

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "API Working" })
})

const startServer = async () => {
    await connectToDb()
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

startServer()
