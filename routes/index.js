const { Router, application } = require("express")

const router = Router()

router.use('/todo', require('./ToDoRoutes'))

module.exports = router