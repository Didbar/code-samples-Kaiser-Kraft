import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";

import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers } from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { totalAmount, loading, count } = useSelector(
    (state) => state.allOrders
  );
  const { loading: usersLoading, users } = useSelector(
    (state) => state.allUsers
  );

  function getOutOFStockProducts() {
    let outOfStock = 0;
    products.forEach((product) => {
      if (product.stock === 0) outOfStock += 1;
    });
    return outOfStock;
  }

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Admin Dashboard"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        {loading || usersLoading ? (
          <Loader />
        ) : (
          <div className="col-12 col-md-10">
            <h1 className="my-4">Dashboard</h1>
            <div className="row pr-4">
              <div className="col-xl-12 col-sm-12 mb-3">
                <div className="card text-white bg-primary o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Total Amount
                      <br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pr-4">
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-success o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Products
                      <br /> <b>{products && products.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/products"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-danger o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Orders
                      <br /> <b>{count}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/orders"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Users
                      <br /> <b>{users.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/users"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-warning o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Out of Stock
                      <br /> <b>{getOutOFStockProducts()}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
