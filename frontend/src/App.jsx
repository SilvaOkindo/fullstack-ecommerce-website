import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin/admin-layout";
import AdminFeatures from "./pages/admin/feature";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/order";
import AdminDashboard from "./pages/admin/dashboard";
import NotFound from "./pages/not-found";
import ShoppingLayout from "./components/shopping/layout";
import Account from "./pages/shopping/Account";
import Checkout from "./pages/shopping/Checkout";
import Home from "./pages/shopping/Home";
import Listing from "./pages/shopping/Listing";
import CheckAuth from "./components/common/check-auth";
import Unauth from "./pages/unauth/Unauth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth_slice";

const App = () => {

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  console.log(user)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(checkAuth())

  }, [dispatch])


  if(isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>


        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="features" element={<AdminFeatures />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />

        <Route path="/shop/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
        </Route>


        <Route path="/unauth-page" element={<Unauth />} />
      </Routes>
    </div>
  );
};

export default App;
