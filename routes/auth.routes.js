const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = Router()

//***************************************************************************
// user registration , check fields email and password  (/api/auth/register)
//***************************************************************************

router.post(
    '/register',
    [
        check('emailRegistration', 'Incorrect email').isEmail(),
        check('passwordRegistration', 'Min length password 6 character')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data registration'
                })
            }

            const {emailRegistration, passwordRegistration} = req.body

            const candidate = await User.findOne({email: emailRegistration})

            if (candidate) {
                return res.status(400).json({message: 'User already exists'})
            }
            const hashedPassword = await bcrypt.hash(passwordRegistration, 12)
            const user = new User({email: emailRegistration, password: hashedPassword})
            console.log(user)
            await user.save()

            res.status(201).json({message: 'User created'})

        } catch (e) {
            res.status(500).json({message: 'Error, try again'})
        }
    })


//***************************************************************************
// user authentication , check fields email and password  (/api/auth/register)
//***************************************************************************
router.post(
    '/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data on login'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'User do not find'})
            }

            const adminState = (email === 'admin@admin.com')
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password, try again'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id, admin: adminState})

        } catch (e) {
            res.status(500).json({message: 'Error, try again'})
        }
    })


module.exports = router

