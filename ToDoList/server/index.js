const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors');

const app = express()
//use express.json to get data into json format
app.use(express.json())
//Port
const PORT = process.env.PORT || 5500

//use cors
app.use(cors());

//Import Routes
const TodoItemRoute = require('./routes/todoItems')

//Connect to mongo db
const connectDB = async () => {
    mongoose.set("strictQuery", false);

    try {
        await mongoose.connect(process.env.DB_CONNECT)
    } catch (err) {
        console.log(err)
    }
}

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

connectDB()

app.use('/', TodoItemRoute)

