import express from 'express'
import {  handleDeletePayment, Insertpayments, paymentsfetch } from '../controller/payments.controller.js'
import { checkAuth } from '../middleware/checkToken.js'

const paymentsRouter = express.Router()
paymentsRouter.post('/payments/:id',checkAuth,Insertpayments)
paymentsRouter.get('/paymentsfetch',paymentsfetch)
paymentsRouter.delete('/deletePayment/:id',handleDeletePayment)


export default paymentsRouter