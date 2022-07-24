const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const Service = require('../models/Service')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const {form,user} = req.body

        const service = new Service({
            device: form.device, claim: form.claim, service: form.service, cost:form.cost, owner: user._id
        })

        await service.save()
        res.status(201).json({service})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Error, try again'})
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const {userSelect} = req.body
        const services = await Service.find({owner: userSelect._id})
        res.json(services)
    } catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        res.json(service)
    } catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }
})

module.exports = router