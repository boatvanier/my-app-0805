import { useGetBooks } from'../api/books/books.ts'
import { useCreateCartItem } from '../api/cart/cart.ts';
import BookCard from '../components/BookCard.jsx';
import { 
  Typography, 
  Snackbar,
  Alert
 } from '@mui/material';
 import { useState } from 'react';

function BookListPage () {
  const { mutate: addToCart, isPending } = useCreateCartItem();
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

  const { data: books, isLoading, isError } = useGetBooks();

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Error loading books.</div>;

  return (
    <>
      <Typography component="h1">Books List</Typography>
        {books?.data?.map((b) => (
          <BookCard 
          book={b} 
          isAdding={isPending}
          handleAddToCart={()=>handleAddToCart(b)}
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

