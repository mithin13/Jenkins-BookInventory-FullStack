import React from 'react';

const BookList = ({ books, handleEdit, deleteBook }) => (
  <div>
    <h2>Available Books</h2>
    {books.length === 0 ? (
      <p>No books found. Add one using the form.</p>
    ) : (
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h4>{book.title}</h4>
            <p className="author">by {book.author}</p>
            <div className="details">
              <p><span>ISBN:</span> {book.isbn}</p>
              <p><span>Price:</span> ${book.price}</p>
              <p><span>Stock:</span> {book.quantity}</p>
            </div>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => handleEdit(book)}>Edit</button>
              <button className="btn-danger" onClick={() => deleteBook(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default BookList;