const express = require('express')
const router = express.Router()
const controladorDePrueba = require('./../controllers/prueba.controller')

router.get('/prueba', controladorDePrueba)

module.exports = router