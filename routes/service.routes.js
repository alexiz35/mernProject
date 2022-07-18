const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const Service = require('../models/Service')
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

router.post('/', auth, async (req, res) => {
    try {
        const {userSelect} = req.body
        /*const services = await Service.find({owner: req.user.userId})*/
        const services = await Service.find({owner: userSelect._id})
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