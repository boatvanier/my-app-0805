import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './layout/Layout';
import BookListPage from './pages/BookListPage'
import App from "./App"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="app" element={<App />} />
          <Route path="books" element={<BookListPage />} />
          {/* <Route path="/books/:bookId" element={<BookViewPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
