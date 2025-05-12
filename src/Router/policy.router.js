import express from 'express'
import { addpolicy,handleDelete,handleUpdatePolicy,policyGet} from '../controller/policy.controller.js'
import { checkAuth } from '../middleware/checkToken.js'
// import { checkAuth } from '../middleware/checkToken.js'
const policyRouter = express.Router()
policyRouter.post('/addpolicy',checkAuth,addpolicy)
policyRouter.get('/retrivePolicy',policyGet)
policyRouter.delete('/policyDelete/:id',handleDelete)
policyRouter.put('/updatePolicy/:id',handleUpdatePolicy)

export default policyRouter