'use strict'

import { Router } from "express"
import { deleteU, save, update } from "./comment.controller.js"
import {  validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/save', [validateJwt], save)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteU)




export default api