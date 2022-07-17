const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()
        res.status(201).json({link})

    } catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const services = await User.find({owner: req.user.userId})
        res.json(services)
    } catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const service = await User.findById(req.params.id)
        res.json(service)
    } catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }
})

module.exports = router