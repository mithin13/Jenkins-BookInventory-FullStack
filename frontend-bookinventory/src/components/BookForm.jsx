import React from 'react';

const BookForm = ({ book, editMode, handleChange, addBook, updateBook, resetForm }) => (
  <form onSubmit={(e) => e.preventDefault()}>
    <h3>{editMode ? 'Edit Book' : 'Add New Book'}</h3>
    
    {/* ID field added here */}
    <div className="form-group">
      <label htmlFor="id">ID</label>
      <input 
        id="id" 
        type="number" 
        name="id" 
        placeholder="e.g., 101" 
        value={book.id} 
        onChange={handleChange} 
        disabled={editMode} 
      />
    </div>

    <div className="form-group">
      <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" placeholder="e.g., The Great Gatsby" value={book.title} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="author">Author</label>
      <input id="author" type="text" name="author" placeholder="e.g., F. Scott Fitzgerald" value={book.author} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="isbn">ISBN</label>
      <input id="isbn" type="text" name="isbn" placeholder="e.g., 978-0743273565" value={book.isbn} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="price">Price</label>
      <input id="price" type="number" name="price" placeholder="e.g., 10.99" value={book.price} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="quantity">Quantity</label>
      <input id="quantity" type="number" name="quantity" placeholder="e.g., 50" value={book.quantity} onChange={handleChange} />
    </div>
    <div>
      {!editMode ? (
        <button className="btn-primary" onClick={addBook}>Add Book</button>
      ) : (
        <>
          <button className="btn-primary" onClick={updateBook}>Update Book</button>
          <button className="btn-secondary" type="button" onClick={resetForm}>Cancel</button>
        </>
      )}
    </div>
  </form>
);

export default BookForm;