const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (users.some(user => user.username === username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
});

// Fetch books from an external API using async-await with Axios
const fetchBooks = async () => {
    try {
        const response = await axios.get('http://api.example.com/books');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books');
    }
};

// Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
    try {
        const books = await fetchBooks();
        res.status(200).send(JSON.stringify(books, null, 2));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book details based on ISBN
// Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        const book = response.data;
        
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).json({ message: 'Failed to fetch book details' });
    }
});


// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        const books = response.data;

        if (books && books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).json({ message: 'Failed to fetch books by author' });
    }
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        const books = response.data;

        if (books && books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        console.error('Error fetching books by title:', error);
        res.status(500).json({ message: 'Failed to fetch books by title' });
    }
});
// Get book reviews
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        res.status(200).json(book.reviews || {});
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
