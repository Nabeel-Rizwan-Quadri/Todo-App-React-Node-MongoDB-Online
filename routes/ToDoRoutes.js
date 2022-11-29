const { Router } = require("express")

const router = Router()

const { getToDo, saveToDo, deleteToDo, updateToDo } = require("../controllers/ToDoController")

router.get("/get", getToDo)
router.post("/save", saveToDo)
router.post("/delete", deleteToDo)
router.post("/update", updateToDo)

module.exports = router