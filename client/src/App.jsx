import Home from './Home_Components/Home';
import Admin from './Admin/DashBoard';
import ProductDetail from "./Home_Components/ProductDetail.jsx";
import Checkout from './Home_Components/Checkout.jsx' 
import Complaint from './Home_Components/Complaint.jsx';
import MyOrder from './Home_Components/MyOrder.jsx'
import Address from './Home_Components/Address.jsx';
import SearchResults from './Home_Components/Searchresult.jsx';

import { Login, Register } from "./UserAuth/AuthPages.jsx";

import NewArrival from './Home_Components/Filter_Option/NewArrival.jsx';
import BestSellers from './Home_Components/Filter_Option/BestSellers.jsx';
import Dresses from './Home_Components/Filter_Option/Dresses.jsx';
import Under1500 from './Home_Components/Filter_Option/Under1500.jsx';





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
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/address" element={<Address />} />
          <Route path="/search" element={<SearchResults />} />

          <Route>
            <Route path="/new-arrivals" element={<NewArrival />} />
          </Route>
          <Route>
            <Route path="/best-sellers" element={<BestSellers />} />
          </Route>
          <Route>
            <Route path="/dresses" element={<Dresses />} />
          </Route>
          <Route>
            <Route path="/under1500" element={<Under1500 />} />
          </Route>
          

          {/* <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          /> */}



          <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />   


        </Routes>
      </Router>
    </CheckoutProvider>
    </AuthProvider>
  );
}

export default App;
