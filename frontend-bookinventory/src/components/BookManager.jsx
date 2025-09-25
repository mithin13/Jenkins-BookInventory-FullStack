import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import BookList from './BookList';
import config from './config.js';

const BookManager = () => {
  // State for the list of books and the form
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
    isbn: '',
    price: '',
    quantity: ''
  });

  // State for the "Get by ID" feature
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedBook, setFetchedBook] = useState(null);

  // State for user feedback messages and form mode
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Fetch all books when the component loads
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(`${config.url}/all`);
      setBooks(res.data);
    } catch (error) {
      setMessage('Failed to fetch books.');
      console.error("Fetch All Error:", error);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // REMOVED: The old generic validateForm function is gone.
  // Validation is now handled inside addBook and updateBook directly.

  const addBook = async () => {
    // --- UPDATED LOGIC ---
    // 1. Create a new object for submission without the 'id' field
    const { id, ...bookToAdd } = book;

    // 2. Validate only the fields for the new book
    for (const key in bookToAdd) {
        if (!bookToAdd[key] || bookToAdd[key].toString().trim() === '') {
            setMessage(`Please fill out the '${key}' field.`);
            return; // Stop the function
        }
    }
    
    try {
      // 3. Send the object that doesn't have an id
      await axios.post(`${config.url}/add`, bookToAdd); 
      setMessage('Book added successfully.');
      fetchAllBooks();
      resetForm();
    } catch (error) {
      setMessage('Error adding book. Check console for details.');
      console.error("Add Book Error:", error);
    }
  };

  const updateBook = async () => {
    // --- UPDATED LOGIC ---
    // 1. Validate all fields for an existing book, including the ID
    for (const key in book) {
        if (!book[key] || book[key].toString().trim() === '') {
            setMessage(`Please fill out the '${key}' field.`);
            return; // Stop the function
        }
    }

    try {
      await axios.put(`${config.url}/update`, book);
      setMessage('Book updated successfully.');
      fetchAllBooks();
      resetForm();
    } catch (error) {
      setMessage('Error updating book. Check console for details.');
      console.error("Update Book Error:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`${config.url}/delete/${id}`);
      setMessage(res.data);
      fetchAllBooks();
    } catch (error) {
      setMessage('Error deleting book. Check console for details.');
      console.error("Delete Book Error:", error);
    }
  };
  
  const getBookById = async () => {
    if (!idToFetch) {
        setMessage('Please enter an ID to fetch.');
        return;
    }
    try {
      const res = await axios.get(`${config.url}/get/${idToFetch}`);
      setFetchedBook(res.data);
      setMessage('Book found successfully.');
    } catch (error) {
      setFetchedBook(null);
      setMessage('Book not found.');
      console.error("Get Book by ID Error:", error);
    }
  };

  const handleEdit = (selectedBook) => {
    setBook(selectedBook);
    setEditMode(true);
    setMessage(`Editing book with ID: ${selectedBook.id}`);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setBook({
      id: '',
      title: '',
      author: '',
      isbn: '',
      price: '',
      quantity: ''
    });
    setEditMode(false);
  };

  // The JSX part below remains exactly the same
  return (
    <div style={{ padding: '20px' }}>
      <h1>Book Inventory Management</h1>
      
      {message && (
        <p style={{ 
          color: message.toLowerCase().includes('error') || message.toLowerCase().includes('failed') || message.toLowerCase().includes('not found') ? 'red' : 'green',
          fontWeight: 'bold'
        }}>
          {message}
        </p>
      )}
      <hr />

      <BookForm
        book={book}
        editMode={editMode}
        handleChange={handleChange}
        addBook={addBook}
        updateBook={updateBook}
        resetForm={resetForm}
      />
      <hr />

      <div>
        <h3>Get Book By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={e => setIdToFetch(e.target.value)}
          placeholder="Enter Book ID"
        />
        <button onClick={getBookById} style={{ marginLeft: '10px' }}>Fetch</button>
        {fetchedBook && (
          <div>
            <h4>Book Found:</h4>
            <pre>{JSON.stringify(fetchedBook, null, 2)}</pre>
          </div>
        )}
      </div>
      <hr />

      <BookList
        books={books}
        handleEdit={handleEdit}
        deleteBook={deleteBook}
      />
    </div>
  );
};

export default BookManager;