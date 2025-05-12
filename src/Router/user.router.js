import express from 'express'
import { addUser,userLogin,getUserData, handleUpdate, handleDelete, getSpecificUserData, getSingleUserData} from '../controller/user.controller.js'
import {checkAuth} from '../middleware/checkToken.js'
const userRouter = express.Router()
userRouter.post('/addUser',addUser)
userRouter.post('/userLogin',userLogin)
userRouter.get('/getUser',getUserData)
userRouter.get('/getUser/:id',getSingleUserData)
userRouter.get('/getSpecificUser',checkAuth,getSpecificUserData)
userRouter.put('/updateUser/:id',handleUpdate)
userRouter.delete('/deleteUser/:id',handleDelete)
export default userRouter