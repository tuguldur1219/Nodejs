const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express()
const port = 3000
const url = 'mongodb://localhost:27017';
const dbName = 'myLibrary';
let books;

(async function() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    books = db.collection('books');
})();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', async (req, res) => {
    const book = req.body;
    await books.insertOne(book);
    res.send('Book is added to the database');
});

app.get('/book', async (req, res) => {
    const cursor = books.find();
    const result = await cursor.toArray();
    res.json(result);
});

app.get('/book/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const result = await books.findOne({ isbn });
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Book not found');
    }
});

app.delete('/book/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const result = await books.deleteOne({ isbn });
    if (result.deletedCount === 1) {
        res.send('Book is deleted');
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/book/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    const result = await books.replaceOne({ isbn }, newBook);
    if (result.modifiedCount === 1) {
        res.send('Book is edited');
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
