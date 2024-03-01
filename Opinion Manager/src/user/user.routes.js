'use strict'

import { Router } from 'express'
import { register, login, update,  get, search, newPassword } from './user.controller.js';
import {  validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()


api.post('/register', register)
api.post('/login', login)

api.put('/update/:id', [validateJwt],update)
api.put('/updatePassword/:id', [validateJwt], newPassword)

api.get('/get', [validateJwt], get)
api.get('/search', [validateJwt], search)

export default api
