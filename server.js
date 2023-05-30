const express = require('express');
const path = require('path');
const { rootRouter } = require('./app/router/root_route');
const dotenv = require('dotenv');
const app = express()
const cors = require('cors')

const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AcrM18cVjQ9NR-ESpJmUXLGO80FUjQE2HIFQYDMb6maFHNKgjjvmDL6zCjwirS6JwkAc6HtsviXB5ihB',
    'client_secret': 'EM2Pqr5s61QOWQiRyXuaimTwN9oCmucKX4reaO0-TVXAFObkaz__Z-flcn1tyRCppoK8hHEymPd7POzi'
});
app.use(cors())
dotenv.config();
app.use(express.json())




// Setup static file
// Nối đường dẫn dùng path.join
// Biến __dirname dùng để dây đường dẫn đúng cho các thiết bị
// http://localhost:7000 tương duong với folder public
const pathPublicDirectory = path.join(__dirname, "./public")
app.use('/public', express.static(pathPublicDirectory))

// app.get("/", (req, res) => { })
app.use("/api/v1", rootRouter)

// const port = 7000
// const port = process.env.PORT || 7000
app.listen(process.env.PORT)

