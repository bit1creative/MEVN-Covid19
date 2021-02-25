import { request } from 'http'

export {}
const express = require('express')
const mongodb = require('mongodb')
const connectToCovid19DB = require('../../database/connection');

const router = express.Router()

//Get post
router.get('/', async (req, res) => {
    const posts = await connectToCovid19DB()
    res.send(await posts.find({}).toArray())
})

//Add post
router.post('/', async (req, res) => {
    const posts = await connectToCovid19DB()
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
    })
    res.status(201).send()
})

//Delete post
router.delete('/:id', async (req, res) => {
    const posts = await connectToCovid19DB()
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send()
})

module.exports = router
