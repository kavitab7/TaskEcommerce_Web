import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import Category from './components/Category';
import CategoryProducts from './pages/CategoryProducts';
import CreateCategory from './pages/CreateCategory';
import Admin from './pages/Admin';
import Header from './components/Header';
import AdminRoutes from './components/privateRoutes/AdminRoutes';
import ProductCreate from './pages/ProductCreate';
import AdminOrders from './pages/AdminOrders';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/api/category/category-products/:name" element={<CategoryProducts />} />
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<Admin />}></Route>
          <Route path="admin/create-category" element={<CreateCategory />}></Route>
          <Route path="admin/create-product" element={<ProductCreate />}></Route>
          {/* <Route path="admin/products" element={<Products />}></Route> */}
          <Route path="admin/orders" element={<AdminOrders />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
