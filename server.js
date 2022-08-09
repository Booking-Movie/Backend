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

const pathPublicDirectory = path.join(__dirname, "./public")
app.use('/public', express.static(pathPublicDirectory))

app.use("/api/v1", rootRouter)

// const port = 7000
// const port = process.env.PORT || 7000
app.listen(process.env.PORT)

