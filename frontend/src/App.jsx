import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage,ProductDetails, SignupPage,Cart, Profile, Homepage, ProductForm, EditProduct } from './Routes.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
