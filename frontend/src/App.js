import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cart from './pages/Cart'
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/createuser" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart/>}/>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
