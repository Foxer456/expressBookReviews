const { fetchBookByTitle } = require('./general');

async function testFetchBookByTitle() {
  try {
    const title = "Things Fall Apart"; // Replace with the title of the book you want to fetch
    const book = await fetchBookByTitle(title);
    console.log(`Book details for "${title}":`, book);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testFetchBookByTitle();
