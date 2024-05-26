import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Troy4trojans",
    database: "books_app"
});


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Welcome to the backend server!');
});

app.get('/books', (req, res) => {
    const q = 'SELECT * FROM books';
    db.query(q, (err, data) => {
        if(err) {
        return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been created successfully!");
    });
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully!");
    });
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET title = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been updated successfully!");
    });
});

app.listen(8813, ()=>{
    console.log('Backend server is running!');
});