import express from 'express'
import { handleDeleteReview, joinreviews, reviewsgain } from '../controller/reviews.controller.js'
import { checkAuth } from '../middleware/checkToken.js'
const reviewsRouter = express.Router()
reviewsRouter.post('/joinreviews',checkAuth ,joinreviews)
reviewsRouter.get('/reviewsgain',reviewsgain)
reviewsRouter.delete('/deleteReview/:id',handleDeleteReview)

export default reviewsRouter