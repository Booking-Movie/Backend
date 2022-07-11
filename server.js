const express = require('express');
const path = require('path');
const { rootRouter } = require('./app/router/root_route');
const dotenv = require('dotenv');
const app = express()
const cors = require('cors')

const port = 7000;

app.use(cors())
dotenv.config();
app.use(express.json())

const pathPublicDirectory = path.join(__dirname, "./public")
app.use('/public', express.static(pathPublicDirectory))
console.log(pathPublicDirectory);

app.use("/api/v1", rootRouter)

app.listen(port, () => {
    console.log(`This is port ${port}`)
})

