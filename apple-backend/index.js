import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './Routes/index.js'

const app = express()
app.use(cors())
app.use(morgan('dev'))
dotenv.config()
app.use(express.json())

app.get('/',function(req ,res){
    res.send('page loaded')
})

app.use('/api/v1',router)

mongoose.connect(process.env.MONGOURL).then(console.log("mongodb connected"))
app.listen(process.env.PORT,()=>{console.log(`server created on port no. -${process.env.PORT} `)})