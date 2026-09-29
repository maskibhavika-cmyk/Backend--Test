const express=require("express")
const userRoutes= require('./routes/userRoutes')
const transactionRoute = require('./routes/transactionRoute')
const app = express()

app.use(express.json())
app.use('/auth/api/v1',userRoutes)

app.use('/transaction/api/v1',transactionRoute)

module.exports = app;
