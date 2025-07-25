import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const BookDetail = () => {
  const { key,title } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`https://openlibrary.org/works/${key}.json`);
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error("Failed to fetch book details", err);
      }
    }

    fetchBook();
  }, [key]);

  if (!book) {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "2rem" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="book-detail" style={{ padding: "2rem", flex: 1 }}>
        <h2>{book.title}</h2>
        <p><strong>Description:</strong> {typeof book.description === 'string' ? book.description : book.description?.value || "N/A"}</p>
        <p><strong>Subjects:</strong> {book.subjects?.slice(0, 5).join(", ")}</p>
        <p><strong>First Published:</strong> {book.first_publish_date || "N/A"}</p>
        {book.covers && book.covers[0] && (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={book.title}
            className="detailsBookCover"
            style={{ marginTop: "1rem", borderRadius: "10px" }}
          />
        )}
      </div>
    </div>
  );
};

export default BookDetail;