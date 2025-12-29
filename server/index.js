import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Message from './models/Message.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log(' MongoDB connected successfully'))
    .catch((err) => console.error(' MongoDB connection error:', err))

// Routes
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body

        
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            })
        }

        
        const newMessage = new Message({
            name,
            email,
            phone,
            message,
        })

        await newMessage.save()

        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: newMessage,
        })
    } catch (error) {
        console.error('Error saving message:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.',
        })
    }
})


app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 })
        res.json({
            success: true,
            data: messages,
        })
    } catch (error) {
        console.error('Error fetching messages:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages',
        })
    }
})


app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`)
})
