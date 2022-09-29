import { Router } from 'express'
import ApiUsuariosMock from '../api/usuarios.js'

const apiUsuarios = new ApiUsuariosMock()

const router = Router()

router.post('/popular', async (req, res, next) => {
   try {
       res.json(await apiUsuarios.popular(req.query.cant))
   } catch (err) {
       next(err)
   }
})
