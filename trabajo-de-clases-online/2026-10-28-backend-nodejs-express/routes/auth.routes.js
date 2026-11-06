const express = require('express')
const router = express.Router()
const { registrar, login } = require('./../controllers/auth.controller')

router.post('/registrar', registrar)

module.exports = router