import {
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './layout/Layout';
import BookListPage from './pages/BookListPage'
import BookViewPage from './pages/BookViewPage'
import Home from './pages/Home';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="books" element={<BookListPage />} />
          <Route path="books/:bookId" element={<BookViewPage />} />
        </Route>
      </Routes>
  );
}

export default App;
