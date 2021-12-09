const express = require('express')
const connectDB = require('./config/db.ts')

const app = express()

connectDB()

app.use(express.json({ extended: true }))
 
const PORT = process.env.PORT || 4000

app.use('/api/usuarios', require('./routes/usuarios.ts'))

// app.get('/', (req, res) => {
//     res.send('Hi world!')
// })

app.listen(PORT, () => {
    console.log(`El servidor está activo en el puerto ${PORT}`)
})
