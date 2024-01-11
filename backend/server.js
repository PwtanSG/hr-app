const path = require('path')
const express = require('express')
var cors = require('cors')
// const bodyParser = require('body-parser');
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware');
const cookieParser = require("cookie-parser");

connectDB()
const app = express()
app.use(cors(
    {
        "origin": "http://localhost:3000",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "credentials": true
      }
))
// app.use(cors(
//     {
//         origin: ["http://localhost:3000/"],
//         methods: ['GET', 'POST', 'PUT'],
//         credentials: true
//     }
// ))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/attendances', require('./routes/attendanceRoutes'))
//serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    ))
}
app.use(errorHandler);
app.listen(port, () => console.log(`serving port ${port}`))