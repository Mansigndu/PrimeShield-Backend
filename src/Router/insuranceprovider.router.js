import express from 'express'
import { appendInsurance, Insuranceobtain } from '../controller/insuranceprovider.controller.js'
const InsuranceRouter = express.Router()
InsuranceRouter.post('/appendInsurance',appendInsurance)
InsuranceRouter.get('/Insuranceobtain',Insuranceobtain)


export default InsuranceRouter
