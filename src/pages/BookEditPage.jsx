import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert
} from "@mui/material";
import { useQueryClient } from '@tanstack/react-query';
import { useGetBook, useUpdateBook, getGetBooksQueryKey } from'../api/books/books.ts'

export default function BookEditPage() {
    const {bookId} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // snackbar
    const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });
  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));


    // Form state
    const [form, setForm] = useState({ title: "", author: "", price: "" });

    // Fetch book data
    const { data, isLoading } = useGetBook(bookId);

    // update book data
    const { mutate: updateBook, isPending } = useUpdateBook();
    const handleUpdateBook = () => {
    updateBook(
        {
            bookId: data.data.bookId,
            data: { ...form }, 
        },
        {
            onSuccess: () =>{
                queryClient.invalidateQueries({ queryKey: getGetBooksQueryKey() })
                navigate("/books")
            },
            onError: (e) =>
                setSnackbar({ open: true, message: 'Failed to update the book', severity: "error" }),
        }
    );
    };

    useEffect(() => {
    if (data) {
        setForm({
        title: data.data.bookName || "",
        author: data.data.authorName || "",
        price: data.data.price || "",
        });
    }
    }, [data]);

    const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateBook();
  };
    if (isLoading) return <p>Loading...</p>;

    return (
    <Container maxWidth="sm">
        <Paper sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
            Update Book
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={form.title||""}
            onChange={handleChange}
            required
            />
            <TextField
            fullWidth
            margin="normal"
            label="Author"
            name="author"
            value={form.author||""}
            onChange={handleChange}
            required
            />
            <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={form.price||""}
            onChange={handleChange}
            required
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            >
             Update Book
            </Button>
        </Box>
        </Paper>
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
    </Container>
    );
}
