import reactLogo from '../assets/react.svg'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

function BookCard({book, handleAddToCart, isAdding}) {
  return (
    <Card
      variant="outlined"
      sx={{ margin:5,
        padding: 2,
        width: { xs: '60%', sm: 'auto' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2,
      }}
    >
    <CardMedia
      component="img"
      width="100"
      height="100"
      alt={book.bookName}
      src={book.image ? book.image : reactLogo}
      sx={{ width: { xs: '100%', sm: 100 },
      }}
    />
    <CardContent  width="200">
      <Link to={`/books/${book.bookId}`}>
        <Typography color="text.primary" component='h3'>
          {book.bookName}
        </Typography>
      </Link>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight="medium"
        textAlign="center"
        sx={{ width: '100%' }}
      >
        {book.authorName}
      </Typography>
        <Typography>
          Price: ${book.price.toFixed(2)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button 
        startIcon={<AddShoppingCartIcon/>}
        onClick={handleAddToCart} 
        disabled={isAdding}
      >
        Add to cart
      </Button>
    </CardActions>
    </Card>
  );
};

export default BookCard;
