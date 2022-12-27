const express = require("express")
// const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()
const db = require('./config/db')
const routes = require("./routes")

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use(routes)

// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("Mongodb Connected..."))
//     .catch((err) => console.error(err))

db.connection
    .once('open', () => console.log("connected to db"))
    .on("error", (err) => console.log("error connecting db -->", err))

app.listen(port, () => {
    console.log(`App is listning on port ${port}`)
})

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'))

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });