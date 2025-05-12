import express from 'express'
import { claimAttain, expandclaim, InsurancePolicy, updateClaimStatus } from '../controller/claims.controller.js'
import { checkAuth } from '../middleware/checkToken.js'
const claimRouter = express.Router()


claimRouter.post('/expandclaim/:cancelFor',checkAuth,expandclaim)
claimRouter.get('/claimAttain',claimAttain)

claimRouter.get('/policyInsurance/:id',InsurancePolicy)
claimRouter.put('/updateClaimStatus/:id',updateClaimStatus)


export default claimRouter
