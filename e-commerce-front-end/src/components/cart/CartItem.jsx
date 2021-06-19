import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onDecrease, onIncrease }) => {
  return (
    <>
      {" "}
      <div className="cart-item" key={item.product}>
        <div className="row">
          <div className="col-4 col-lg-3">
            <img src={item.image} alt="Laptop" height="90" width="115" />
          </div>

          <div className="col-5 col-lg-3">
            <Link to={`/product/${item.product}`}>{item.name}</Link>
          </div>

          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
            <p id="card_item_price">${item.price}</p>
          </div>

          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
            <div className="stockCounter d-inline">
              <span
                className={`btn btn-danger minus ${
                  item.quantity === 1 && "disabled"
                }`}
              >
                -
              </span>

              <span className="badge badge-pill badge-info m-2 qty">
                {item.quantity}
              </span>
              <span
                className={`btn btn-primary plus ${
                  item.quantity >= item.stock && "disabled"
                } `}
              >
                +
              </span>
            </div>
          </div>

          <div className="col-4 col-lg-1 mt-4 mt-lg-0">
            <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
