const express = require('express')
const Joi = require('joi')
const NodeCache = require('node-cache')
const cache = new NodeCache()
const fs = require('fs');
const {insertBook, insertBooks, getBook, getBooks, updateBook, updateQuantity, deleteBook} =
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
        cache.del('books') 
        res.send('Book is added to the database');
        res.status(200).end()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).end()
    })
})

// deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
router.post('/books', (req, res) =>{
    const booksFile = JSON.parse(fs.readFileSync('./Bulkbooks.json', 'utf8'))
    const booksStr = JSON.stringify(booksFile);
    const books = JSON.parse(booksStr)
    insertBooks(books)
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
    const book = cache.get(isbn)
    if(book){
        res.json(book)
        res.status(200).end()
    } else {
        getBook(isbn).then((book) => {
            cache.set(isbn, book) 
            res.json(book)
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
    }
});

router.get('/books', (req, res) => {
    const books = cache.get('books')
    if(books){
        res.json(books)
        res.status(200).end()
    } else {
        getBooks().then((books) => {
            cache.set('books', books) 
            res.json(books)
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
    }
});

router.post('/book/:isbn', (req, res) => {
    const {isbn} = req.params
    const book = req.body
    updateBook(isbn, book)
    .then((updatedBook) => {
        cache.set(isbn, updatedBook) 
        cache.del('books') 
        res.json(updatedBook)
        res.status(200).end()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).end()
    })
});

router.post('/book/:isbn/quantity', (req, res) => {
    const {isbn} = req.params
    const {quantity} = req.body
    updateQuantity(isbn, quantity)
    .then((updatedBook) => {
        cache.set(isbn, updatedBook) 
        cache.del('books') 
        res.json(updatedBook)
        res.status(200).end()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).end()
    })
});

router.delete('/book/:isbn', (req, res) => {
    const {isbn} = req.params
    deleteBook(isbn)
    .then(() => {
        cache.del(isbn) 
        cache.del('books')
        res.json(deleteBook)
        res.status(200).end()
    })
    .catch((err)=> {
        console.log(err)
        res.status(500).end()
    })
});
module.exports = router