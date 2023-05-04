
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
    // const getBooks = () => {
    //     const collection = db.collection('books')
    //     return collection.find({}).toArray()
    // }
     const getBook = (isbn) => {
         const collection = db.collection('books')
         return collection.findOne({isbn: (isbn)})
     }
    // const updateBook = () => {
    //     const collection = db.collection('books')
    //     return collection.updateOne(book)
    // }
    // const updateQuantity = () => {
    //     const collection = db.collection('books')
    //     return collection.updateOne({numOfPages})
    // }
    // const deleteBook = () => {
    //     const collection = db.collection('books')
    //     return collection.deleteOne(book)
    // }
    
    
module.exports = {init, insertBook, getBook}