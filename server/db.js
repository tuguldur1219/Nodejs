
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tuguldursoiboi1219:123@cluster0.uyrhkck.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'Cluster0'
let db
const init= () =>
    MongoClient.connect(uri).then((client)=> {
        db = client.db(dbName)
    })
    const insertBook = (book) => {
        const collection = db.collection('books')
        return collection.insertOne(book)
    }
    
    const insertBooks = (Bulkbooks) => {
        const collection = db.collection('books')
        return collection.insertMany(Bulkbooks)
    }
     const getBooks = () => {
         const collection = db.collection('books')
         return collection.find({}).toArray()
     }
     const getBook = (isbn) => {
         const collection = db.collection('books')
         return collection.findOne({isbn: (isbn)})
     }
     const updateBook = (book) => {
         const collection = db.collection('books')
         return collection.replaceOne(book)
    }
     const updateQuantity = () => {
         const collection = db.collection('books')
         return collection.updateOne({numOfPages})
     }
     const deleteBook = (isbn) => {
         const collection = db.collection('books')
         return collection.deleteOne({isbn: (isbn)})
     }
    
    
module.exports = {init, insertBook, getBook, getBooks, updateBook, updateQuantity, deleteBook, insertBooks}