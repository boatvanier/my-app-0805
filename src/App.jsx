import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import Layout from './layout/Layout';
import BookListPage from './pages/BookListPage'
import BookViewPage from './pages/BookViewPage'
import BookEditPage from './pages/BookEditPage'
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="books" element={<BookListPage />} />
          <Route path="books/:bookId" element={<BookViewPage />} />
          <Route path="books/:bookId/edit" element={<BookEditPage />} />
        </Route>
      </Routes>
     </BrowserRouter>
  );
}
export default App;
