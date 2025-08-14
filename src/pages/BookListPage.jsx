import { getGetBooksQueryKey, useDeleteBook, useGetBooks } from'../api/books/books.ts'
import { useCreateCartItem } from '../api/cart/cart.ts';
import BookCard from '../components/BookCard.jsx';
import { 
  Typography, 
  Snackbar,
  Alert
 } from '@mui/material';
 import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function BookListPage () {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isAddtoCartPending } = useCreateCartItem();
  const { mutate: deleteBook, isDeletePending } = useDeleteBook();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });
  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));
  const handleAddToCart = (b) => {
    addToCart(
      {
        userId:1,
        data: { bookId: b.bookId }, // matches CartCreateRequest
      },
      {
        onSuccess: () =>
          setSnackbar({ open: true, message: `Added "${b.bookName}"!`, severity: "success" }),
        onError: () =>
          setSnackbar({ open: true, message: "Failed to add to cart.", severity: "error" }),
      }
    );
  };

  const handleDeleteBook = (b) => {
    deleteBook(
      {
        bookId:b.bookId,
      },
      {
        onSuccess: () => {
          setSnackbar({ open: true, message: `Book is Deleted!`, severity: "success" })
          queryClient.invalidateQueries({ queryKey: getGetBooksQueryKey() })},
        onError: () =>
          setSnackbar({ open: true, message: "Failed to delete the book.", severity: "error" }),
      }
    );
  };

  const { data: books, isLoading, isError } = useGetBooks();

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Error loading books.</div>;

  return (
    <>
      <Typography component="h1">Books List</Typography>
        {books?.data?.map((b) => (
          <BookCard 
          book={b} 
          isAdding={isAddtoCartPending}
          isDeleting={isDeletePending}
          handleAddToCart={()=>handleAddToCart(b)}
          handleDelete={()=>handleDeleteBook(b)}
          key={b.bookId} />
        ))}
      <Snackbar 
      open={snackbar.open} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={2000} 
      onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </>
  );
};

export default BookListPage;

