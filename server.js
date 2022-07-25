const express = require('express');
const path = require('path');
const { rootRouter } = require('./app/router/root_route');
const dotenv = require('dotenv');
const app = express()
const cors = require('cors')

app.use(cors())
dotenv.config();
app.use(express.json())

const pathPublicDirectory = path.join(__dirname, "./public")
app.use('/public', express.static(pathPublicDirectory))

app.use("/api/v1", rootRouter)

const port = 7000
// const port = process.env.PORT || 7000
app.listen(port)

