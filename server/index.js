const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const router = require('./router')
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const CLIENT_URL = require("./config")

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));
app.use("/api", router)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://user:user@auth.tsubhrf.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()