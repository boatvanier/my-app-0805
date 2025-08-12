import React, { useState } from 'react';
import { useGetBook } from'../api/books/books.ts'
import BookCard from '../components/BookCard.jsx';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function BookViewPage () {
  const {bookId} = useParams();
  const { data: book, isLoading, isError } = useGetBook(bookId);

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Error loading books.</div>;
  return (
          <BookCard book={book.data} />
  );
};

export default BookViewPage;

