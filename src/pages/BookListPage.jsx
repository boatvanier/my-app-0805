import React, { useState } from 'react';
import { useGetBooks, useCreateBook } from'../api/books/books.ts'
import BookCard from '../components/BookCard.jsx';

function BookListPage () {
  const { data: books, isLoading, isError } = useGetBooks();
  const { mutate: createBook, isLoading: isPosting } = useCreateBook();

//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createBook(
//       { data: { title, author } }, // 'data' is the POST body according to Orval
//       {
//         onSuccess: () => {
//           setTitle('');
//           setAuthor('');
//         },
//       }
//     );
//   };

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Error loading books.</div>;

  return (
    <div>
      <h2>Books List</h2>
        {books?.data?.map((b) => (
          <BookCard book={b} key={b.bookId} />
        ))}

      {/* <h3>Add a new Book</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit" disabled={isPosting}>
          {isPosting ? 'Adding...' : 'Add Book'}
        </button>
      </form> */}
    </div>
  );
};

export default BookListPage;

