const mongoose = require("mongoose")

const DB_NAME = 'todo_app'

const mongoURI = `mongodb+srv://nabeel:YXhuJyFvkRPJ07AU@cluster0.qib4lja.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(mongoURI, { useNewUrlParser: true })

module.exports = mongoose;