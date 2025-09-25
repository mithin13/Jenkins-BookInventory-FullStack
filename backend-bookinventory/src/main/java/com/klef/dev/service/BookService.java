package com.klef.dev.service;

import com.klef.dev.entity.Book;
import java.util.List;

public interface BookService {
    Book addBook(Book book);
    List<Book> getAllBooks();
    Book getBookById(Long id);
    Book updateBook(Book book);
    void deleteBookById(Long id);
}