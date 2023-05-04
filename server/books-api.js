const express = require('express')
const Joi = require('joi')

const {insertBook, getBook} =
require('./db')

const router = express.Router()

const bookSchema = Joi.object().keys({
    isbn: Joi.string().length(10),
    title: Joi.string().required(),
    author: Joi.string().required(),
    publish_date: Joi.date().iso(),
    publisher: Joi.string(),
    numOfPages: Joi.number().integer()
});
router.post('/book', (req, res) =>{
    const book = req.body
    console.log(req.body)
    const result = bookSchema.validate(book)
    if(result.error) {
        console.log(result.error)
        res.status(400).end()
        return
    }
    insertBook(book)
    .then(()=> {
        res.send('Book is added to the database');
        res.status(200).end()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).end()
    })
})
router.get('/book/:isbn', (req, res) => {
    const {isbn} = req.params
    getBook(isbn)
    .then((book) => {
        res.json(book)
        res.status(200).end()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).end()
    })
});

module.exports = router 