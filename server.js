import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import contactRouter from './routes/contact.route.js'
import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
app.use(cors({
    origin: "https://bhanu-sharma-frontend.vercel.app", // ✅ Frontend का सही URL डालो
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json())
app.use('/', contactRouter)
app.use(errorMiddleware)

app.listen(5000, () => {
    connectDB();
    console.log("server is running on: http://localhost:5000")
})
