const { body } = require('express-validator')

const validacionRegistrar = [
    body('nombre')
        .notEmpty().withMessage('Hey, el nombre es obligatorio!')
        .isLength({ min: 3 }).withMessage('Hey! El nombre de tener al menos 3 caracteres'),
    body('email')
        .notEmpty().withMessage('Hey, el email no puede estar vacio!')
        .isEmail().withMessage('Hey! debes enviar un email valido'),
    body('password')
        .notEmpty().withMessage('Hey, la contraseña es obligatoria!')
        .isStrongPassword().withMessage('Hey! La contraseña debe de tener minimo 8 caracteres, mayus, minus, nums y al menos un caracter especial')

]

const validacionLogin = [
    body('email')
        .notEmpty().withMessage('El email no puede estar vacio!'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria!')    
]

module.exports = {
    validacionRegistrar,
    validacionLogin
}