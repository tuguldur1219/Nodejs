const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'library';

const client = new MongoClient(url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const books = db.collection('books');

    // Insert a new book
    const result = await books.insertOne({
      isbn: '1234567890',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publisher: 'Scribner',
      publish_date: new Date(1925, 3, 10),
      numOfPages: 218,
    });

    console.log(`Inserted ${result.insertedCount} document(s)`);

    // Update a book
    const filter = { isbn: '1234567890' };
    const updateDoc = {
      $set: {
        author: 'Francis Scott Fitzgerald',
        publish_date: new Date(1925, 4, 10),
        numOfPages: 250,
      },
    };
    const updateResult = await books.updateOne(filter, updateDoc);

    console.log(`Updated ${updateResult.modifiedCount} document(s)`);

    // Delete a book
    const deleteResult = await books.deleteOne({ isbn: '1234567890' });
    console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

    // Find all books and display them
    const cursor = await books.find();
    await cursor.forEach(book => {
      const x = `
        <div class="col-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                    <div>Author: ${book.author}</div>
                    <div>Publisher: ${book.publisher}</div>
                    <div>Number Of Pages: ${book.numOfPages}</div>

                    <hr>

                    <button type="button" class="btn btn-danger" onclick="deleteBook('${book.isbn}')">Delete</button>
                    <button types="button" class="btn btn-primary" data-toggle="modal" 
                        data-target="#editBookModal" onClick="setEditModal('${book.isbn}')">
                        Edit
                    </button>
                </div>
            </div>
        </div>
      `;

      document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

run();
