const express = require('express')
const router = express.Router()
const service = require('../service')

router.get('/', async function(req,res,next) {
    try {
        res.json(await service.getAllMenu(req.query.page))
    } catch(error) {
        console.error('Error while getting all menu', error.message)
        next(error)
    }
})

router.get('/:id', async function(req,res,next) {
    try {
        res.json(await service.getSinglemenu(req.params.id))
    } catch(error) {
        console.error('Error while getting single menu', error.message)
        next(error)
    }
})

router.post('/takeaway', async function(req, res, next) {
    try{
        res.json(await service.createTakeaway(req.body))
    } catch (error) {
        console.error('Error while adding transaksi_takeaway', error.message)
        next(error)
    }
})

router.post('/dinein', async function(req, res, next) {
    try{
        res.json(await service.createDinein(req.body))
    } catch (error) {
        console.error('Error while adding transaksi_dinein', error.message)
        next(error)
    }
})

module.exports = router