const { fetchBooks } = require('./general');

async function testFetchBooks() {
  try {
    const books = await fetchBooks();
    console.log('List of books:', books);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testFetchBooks();
