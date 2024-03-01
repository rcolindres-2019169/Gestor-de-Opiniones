'use strict'

//Importaciones
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from "dotenv"
import userRotes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import postRoutes from '../src/post/post.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
    
//Configuraciones
const app = express()
config();
const port = process.env.PORT || 3056

//Configuración del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Aceptar o denegar solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet()) //Aplica capa de seguridad básica al servidor
app.use(morgan('dev')) //Logs de solicitudes al servidor HTTP

//Declaración de rutas
app.use('/user', userRotes)
app.use('/category', categoryRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)
//Levantar el servidor
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}