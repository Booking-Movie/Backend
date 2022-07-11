const { Router } = require('express');
const { SearchResult, FilterDate } = require('../controllers/search_controller');

const searchRouter = Router()

searchRouter.get("/:term", SearchResult)
searchRouter.get("/filter/:id", FilterDate)

module.exports = {
    searchRouter
}