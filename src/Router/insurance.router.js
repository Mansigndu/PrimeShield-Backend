import express from 'express'
import { handleGetInsurance, handleInsurance, handleupdateInsurance,handleDeleteInsurance } from '../controller/insurance.controller.js'

const InsurancesRouter = express.Router()
InsurancesRouter.post('/post',handleInsurance)
InsurancesRouter.get('/insGet',handleGetInsurance)
InsurancesRouter.put('/updateInsurance/:id',handleupdateInsurance)
InsurancesRouter.delete('/deleteInsu/:id',handleDeleteInsurance)


export default InsurancesRouter