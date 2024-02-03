import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Books.css';
import star from '../assets/Star.png'

function Books({ searchQuery }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
      .then((res) => setData(res.data.books))
      .catch((error) => console.error(error));
  }, []);

  const generateRandomRating = () => {
    return (Math.random() * (3 - 1) + 3).toFixed(1);
  };

  const filteredBooks = searchQuery
    ? data.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

  return (
    <div>
      <div className='main'>
        {filteredBooks.map(book => (
          <div key={book.id} className='book-container'>
            <img src={book.imageLinks?.thumbnail} alt="" />
            <h1>{book.title}</h1>
            <div className="book-rating">
              <img src={star} alt="Star" /> {generateRandomRating()}
              <p>Free</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
