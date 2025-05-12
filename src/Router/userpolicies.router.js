import express from 'express'
import { attachuserpolicy, userpolicyAcquire, userpolicyDelete } from '../controller/userpolicies.controller.js'
const userPolicyRouter = express.Router()
userPolicyRouter.post('/attachuserpolicy',attachuserpolicy)
userPolicyRouter.get('/attachuserpolicy',userpolicyAcquire)
userPolicyRouter.delete('/deleteuserPolicy',userpolicyDelete)
export default userPolicyRouter
