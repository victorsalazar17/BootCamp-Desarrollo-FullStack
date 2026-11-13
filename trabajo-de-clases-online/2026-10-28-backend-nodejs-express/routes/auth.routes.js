const express = require('express')
const router = express.Router()
const { validacionRegistrar } = require('./../validators/auth.validator')
const validador = require('./../middlewares/validar.middleware')
const { registrar, login } = require('./../controllers/auth.controller')

router.post('/registrar', validacionRegistrar, validador, registrar)

module.exports = router