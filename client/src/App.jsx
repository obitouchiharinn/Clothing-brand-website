import Home from './Home_Components/Home';
import Admin from './Admin/DashBoard';
import ProductDetail from "./Home_Components/ProductDetail.jsx";
import Checkout from './Home_Components/Checkout.jsx' 

import { Login, Register } from "./UserAuth/AuthPages.jsx";


import { CheckoutProvider } from './Context/Context.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from "./Context/AuthContext.jsx";
import PrivateRoute from "./Context/PrivateRoute.jsx";

function App() {
  return (
    <AuthProvider>

    <CheckoutProvider>
      <Router>
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* <Route
            path="/Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          /> */}



          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   


        </Routes>
      </Router>
    </CheckoutProvider>
    </AuthProvider>
  );
}

export default App;
