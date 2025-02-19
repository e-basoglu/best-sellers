import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get('http://localhost:8813/books');
                setBooks(res.data);
                console.log(res)
            }catch(err){
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8813/books/${id}`);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }


    return (
        <div>
          <h1>Editor's Picks</h1>
          <div className="books">
            {books.map((book) => (
              <div key={book.id} className="book">
                <img src={book.cover} alt="" />
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>${book.price}</span>
                <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                <button className="update">
                  <Link
                    to={`/update/${book.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </button>
              </div>
            ))}
          </div>
    
          <button className="addHome">
            <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
              Add new book
            </Link>
          </button>
        </div>
      );
    };
    
    export default Books;
