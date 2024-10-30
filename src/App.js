

import AdminLogin from "./screens/admin/AdminLogin";
import Home from "./screens/userinterface/Home";
import Cart from "./screens/userinterface/Cart";
import ProductDetails from "./screens/userinterface/ProductDetails";
import AdminDashboard from "./screens/admin/AdminDashboard";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PlusMinusComponent from "./components/userinterface/PlusMinusComponent";
import SignUpComponent from "./components/userinterface/SignUpComponent";
import SignUp from "./components/userinterface/SignUp";
import SignInPage from "./screens/userinterface/SignInPage";
import OtpPage from "./screens/userinterface/OtpPage";
import AddAddress from "./components/userinterface/AddAddress";
import OtpComponent from "./components/userinterface/OtpComponent";
import AddressDetails from "./components/userinterface/AddressDetails";
import DileveryAddress from "./components/userinterface/DileveryAddress";
import DisplayOrders from "./components/userinterface/DisplayOrders";
import FilterComponent from "./components/userinterface/FilterComponent";
import FilterScreen from "./screens/userinterface/FilterScreen";


function App() {
  return (
    <div >
      <Router>
          <Routes>
          <Route element={<SignUp/>} path={'/signup'}/>
          <Route element={<SignUpComponent/>} path={'/signupcomponent'}/>
          <Route element={<PlusMinusComponent/>} path={'/plusminuscomponent'}/>
          <Route element={<ProductDetails/>} path={'/productdetails'}/>
          <Route element={<Cart/>} path={'/cart'}/>
            <Route element={<Home/>} path={'/home'}/>
            <Route element={<AdminLogin/>} path={'/adminlogin'}/>
             <Route element={<AdminDashboard/>} path={'/admindashboard/*'}/>
             <Route element={<SignInPage/>} path={'/signinpage'}/>
             <Route element={<OtpComponent/>} path={'/otpcomponent'}/>
             <Route element={<AddressDetails/>} path={'/addressdetails'}/>
             <Route element={<DileveryAddress/>} path={'/dileveryaddress'}/>
             <Route element={<DisplayOrders/>} path={'/displayorders'}/>
             <Route element={<FilterComponent/>} path={'/filtercomponent'}/>
             <Route element={<FilterScreen/>} path={'/filterscreen/:pattern'}/>
          
             <Route element={<AddAddress/>} path={'/addaddress'}/>
             
          </Routes>
        </Router>
        
        
       
    </div>
  );
}

export default App;
