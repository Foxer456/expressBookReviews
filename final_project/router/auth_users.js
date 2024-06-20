const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

const app = express();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
 return users.some(user => user.username === username && user.password === password);

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 *60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
    console.log(review);
  if (!req.session.authorization) {
    return res.status(401).json({ message: "User not logged in" });
  }

  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Add or modify the review
  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;
  console.log(books[isbn].reviews); // Debug: log the reviews to check if they are updated

  return res.status(200).json({ message: "Review successfully added/modified" });
});

// Delete a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
  
    if (!req.session.authorization) {
      return res.status(401).json({ message: "User not logged in" });
    }
  
    const username = req.session.authorization.username;
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    if (!books[isbn].reviews[username]) {
      return res.status(404).json({ message: "Review not found" });
    }
  
    // Delete the review
    delete books[isbn].reviews[username];
  
    return res.status(200).json({ message: "Review successfully deleted" });
  });
  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
