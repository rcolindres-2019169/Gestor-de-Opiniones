'use strict'

import { Router } from "express"
import { deleteU, save, update } from "./comment.controller.js"
import {  validateJwt } from '../middlewares/validate-jwt.js'

api.post('/save', save)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete', [validateJwt], deleteU)

const api = Router()


export default api