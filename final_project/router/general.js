const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios');

// Function to fetch the list of books available in the shop
const fetchBooks = async () => {
    try {
      const response = await axios.get('https://lukasfuchs14-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/'); // Replace with your actual endpoint
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error.message);
      throw error;
    }
  };
  
  module.exports = {
    fetchBooks
  };
  
// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookList = [];

  for (let isbn in books) {
    if (books[isbn].author === author) {
      bookList.push(books[isbn]);
    }
  }

  if (bookList.length > 0) {
    res.send(JSON.stringify(bookList, null, 4));
  } else {
    res.status(404).send("Books by this author not found");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookList = [];

  for (let isbn in books) {
    if (books[isbn].title === title) {
      bookList.push(books[isbn]);
    }
  }

  if (bookList.length > 0) {
    res.send(JSON.stringify(bookList, null, 4));
  } else {
    res.status(404).send("Books with this title not found");
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    res.status(404).send("Book not found");
  }
});

module.exports.general = public_users;
