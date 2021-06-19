import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/productDetails";

import { HelmetProvider } from "react-helmet-async";

//Cart Imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";

//Order Imports
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";

//User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

//Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import UpdateProduct from "./components/admin/UpdateProduct";
import CreateProduct from "./components/admin/CreateProduct";
import OrderDetails from "./components/order/OrderDetails";
import OrdersList from "./components/admin/OrdersList";
import UsersList from "./components/admin/UsersList";
import ProcessOrder from "./components/admin/ProcessOrder";

import { loadUser } from "./actions/userActions";
import ProtectedRoute from "./routes/ProtectedRoute";
import store from "./store";

import axios from "axios";
import "./App.scss";

//Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <div className="App">
        <Router>
          <Header />
          <div className="container container-fluid">
            <ProtectedRoute path="/me" component={Profile} exact />
            <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
            <ProtectedRoute
              path="/password/update"
              component={UpdatePassword}
              exact
            />
            <Route path="/cart" component={Cart} exact />
            <ProtectedRoute path="/shipping" component={Shipping} />

            <ProtectedRoute path="/success" component={OrderSuccess} exact />
            <ProtectedRoute path="/orders/me" component={ListOrders} exact />
            <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
            <ProtectedRoute path="/confirm/order" component={ConfirmOrder} />

            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute path="/payment" component={Payment} />
              </Elements>
            )}

            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/password/forgot" component={ForgotPassword} exact />
            <Route
              path="/password/reset/:token"
              component={NewPassword}
              exact
            />
            <Route path="/" component={Home} exact />
          </div>
          <ProtectedRoute
            path="/dashboard"
            isAdmin={true}
            component={Dashboard}
            exact
          />
          <ProtectedRoute
            path="/admin/products"
            isAdmin={true}
            component={ProductList}
            exact
          />
          <ProtectedRoute
            path="/admin/product"
            isAdmin={true}
            component={CreateProduct}
            exact
          />
          <ProtectedRoute
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
            exact
          />
          <ProtectedRoute
            path="/admin/orders"
            isAdmin={true}
            component={OrdersList}
            exact
          />
          <ProtectedRoute
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
            exact
          />
          <ProtectedRoute
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
            exact
          />
          <ProtectedRoute
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
            exact
          />
          <ProtectedRoute
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
            exact
          />

          {!loading && user && user.role !== "admin" && <Footer />}
        </Router>
      </div>
    </HelmetProvider>
  );
};

export default App;
