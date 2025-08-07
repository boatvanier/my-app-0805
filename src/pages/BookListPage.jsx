import { useGetBooks, useCreateBook } from'../api/books/books.ts'
import BookCard from '../components/BookCard.jsx';
import { Typography } from '@mui/material';

function BookListPage () {
  const { data: books, isLoading, isError } = useGetBooks();
  
  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Error loading books.</div>;

  return (
    <>
      <Typography component="h1">Books List</Typography>
        {books?.data?.map((b) => (
          <BookCard book={b} key={b.bookId} />
        ))}
    </>
  );
};

export default BookListPage;

