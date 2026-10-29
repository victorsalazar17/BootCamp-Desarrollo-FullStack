const express = require('express')
const app = express()

app.listen(3000, () => {
    try {
        console.log("Conectado al puerto")
    } catch (erorr) {
        console.log("Error conectandose al servidor", erorr.message)
    }
})