import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import contactRouter from './routes/contact.route.js'
import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
app.use(cors({
    origin: '*',  // अगर specific origin allow करना हो तो 'http://localhost:5173' लिखो
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json())
app.use('/', contactRouter)
app.use(errorMiddleware)

app.listen(5000, () => {
    connectDB();
    console.log("server is running on: http://localhost:5000")
})