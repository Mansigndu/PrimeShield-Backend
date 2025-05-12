import express from 'express'
import { formGet, formUserGet, handleForm, handleUpdateStatus,handleDeleteForm, formGetById } from '../controller/form.controller.js'
import { checkAuth } from '../middleware/checkToken.js'




const formRouter = express.Router()
formRouter.post('/handleForm/:id',checkAuth,handleForm)
formRouter.get('/formGet',formGet)
formRouter.get('/formuserDetails',checkAuth,formUserGet)
formRouter.get('/formGetById/:id',formGetById)
formRouter.put('/updateStatus/:id',handleUpdateStatus)
formRouter.delete('/deleteForm/:id',handleDeleteForm)

export default formRouter