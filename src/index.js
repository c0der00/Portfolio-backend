import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import cookieParser from 'cookie-parser'

dotenv.config({
    path: './.env',
})


 const app = express()

 

 app.use( express.json({limit:"20kb"}))
 app.use(express.urlencoded({extended:true,limit:"20kb"}))
 app.use(express.static("public"))

 app.use(cookieParser())

connectDB()
.then(() => {
    app.on("error",(error) => {
        console.log("ERROR" , error);        
        throw error
    })
    app.listen(process.env.PORT || 6000,() => {
        console.log(`server is ranning at port numer ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log('monodb connection fail ' , error);
})

app.get('/', (req, res) => {
    res.send('API is running');
});

import cors from 'cors'
import contactRouter from './router/contact_router.js'

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use("/api",contactRouter)