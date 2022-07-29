const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

//***************************************************************************
// edit user , return update user  (/api/user/edit)
//***************************************************************************

router.post(
    '/edit',
    auth,

    async (req, res) => {
        try {

            const {firstName, lastName, phone, userId} = req.body
            const user = await User.findByIdAndUpdate(
                userId,
                {firstName: firstName, lastName: lastName, phone: phone},
                {returnDocument: "after"}
            )
            res.status(201).json({user})
        } catch (e) {
            res.status(500).json({message: 'Error, try again'})
        }
    })

//***************************************************************************
// get all list users   (/api/user)
//***************************************************************************

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }
})

//***************************************************************************
// get  user by Id  (/api/user/:id)
//***************************************************************************

router.get('/:id', auth, async (req, res) => {
    try {
        const service = await User.findById(req.params.id)
        res.json(service)
    } catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }
})

module.exports = router