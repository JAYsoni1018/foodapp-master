import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screen/Home';
import Login from './screen/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screen/Signup';
import { CartProvider } from './Components/ContextReducer';
import Myorder from './screen/Myorder';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Header />
          <Routes>

            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<Myorder />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      </CartProvider>
      );
}

      export default App;
