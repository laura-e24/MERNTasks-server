const Usuario = require('../models/User.ts')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')


exports.createUser = async (req, res) => {


    const errors = validationResult(req)

    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() })
    }

    const { password, email } = req.body

    try { 
        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' })
        }
        usuario = new Usuario(req.body)

        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)

        await usuario.save()

        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error

            res.json({ token })
        })
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error.')
    }
}