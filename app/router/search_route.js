const { Router } = require('express');
const { SearchResult, FilterDate, SearchUser } = require('../controllers/search_controller');

const searchRouter = Router()

searchRouter.get("/:term", SearchResult)
searchRouter.get("/search-user/:user", SearchUser)
searchRouter.get("/filter/:id", FilterDate)

module.exports = {
    searchRouter
}