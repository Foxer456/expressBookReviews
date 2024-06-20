const { fetchBookByISBN } = require('./general');

async function testFetchBookByISBN() {
  try {
    const isbn = '2'; // Replace with a valid ISBN
    const book = await fetchBookByISBN(isbn);
    console.log('Book details:', book);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testFetchBookByISBN();
