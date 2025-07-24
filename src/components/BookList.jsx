

const getCoverURL = (coverId) =>
  coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

import React from "react";
import { Link } from "react-router-dom";



export default function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map((book, i) => (
        <Link key={i} to={`/book/${book.key.replace('/works/', '')}`} className="book-item">
          <div className="book-card">
            <img src={getCoverURL(book.cover_i)} alt={book.title} />
            <h3>{book.title}</h3>
            <p>👤 Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
            <p>📅 First Published: {book.first_publish_year || "N/A"}</p>
          </div>  
        </Link>
      ))}
    </div>
  );
}