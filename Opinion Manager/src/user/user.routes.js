'use strict'

import { Router } from 'express'
import { register, login, update, deleteU, get, search } from './user.controller.js';
import {  validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()


api.post('/register', register)
api.post('/login', login)

api.put('/update/:id', [validateJwt],update)
api.delete('/delete/:id', [validateJwt],deleteU)

api.get('/get', [validateJwt], get)
api.get('/search', [validateJwt], search)

export default api
