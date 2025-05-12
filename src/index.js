import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import ConnectDB from "./Db/database.js"
import userRouter from './Router/user.router.js'
import cookieParser from 'cookie-parser'
import policyRouter from './Router/policy.router.js'
import InsuranceRouter from './Router/insuranceprovider.router.js'
import userPolicyRouter from './Router/userpolicies.router.js'
import claimRouter from './Router/claim.router.js'
import paymentsRouter from './Router/payments.router.js'
import reviewsRouter from './Router/reviews.router.js'
import cors from 'cors'
import InsurancesRouter from './Router/insurance.router.js'
import formRouter from './Router/form.router.js'
const app = express()

const port = process.env.PORT

app.use(cors({
  origin:'*',
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Authorization",'Content-Type']
}))

// built in middleware
app.use(cookieParser())
app.use(express.json())

// router level middleware
app.use('/',userRouter)
app.use('/',policyRouter)
app.use('/',InsuranceRouter)
app.use('/',userPolicyRouter)
app.use('/',claimRouter)
app.use('/',paymentsRouter)
app.use('/',reviewsRouter)
app.use('/',InsurancesRouter)
app.use('/',formRouter)


//mongo db connection and server run
  ConnectDB()
  .then(()=>{
    app.listen(port,()=>{
        console.log(`SERVER RUN ON http://localhost:${port}`)
    })
  })  
  .catch((error)=>{
    console.log(error)
  })
  