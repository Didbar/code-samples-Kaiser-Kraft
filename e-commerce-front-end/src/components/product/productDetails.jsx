import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";

import Rating from "@material-ui/lab/Rating";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "../review/ListReviews";

const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const increaseQty = () => {
    if (quantity >= product.stock) {
      return;
    }
    setQuantity(quantity + 1);
  };
  const decreaseQty = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review posted successfully");
      dispatch({
        type: NEW_REVIEW_RESET,
      });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, alert, error, success, reviewError, match.params.id]);

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);

    dispatch(newReview(formData));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100 img"
                        src={image.url}
                        alt={image.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product #{product._id}</p>

              <hr />

              <div className="rating-outer">
                <Rating
                  name="read-only"
                  value={product.ratings}
                  precision={0.1}
                  readOnly
                />
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span
                  className={`btn btn-danger minus ${
                    quantity === 1 && "disabled"
                  }`}
                  onClick={decreaseQty}
                >
                  -
                </span>

                <span className="badge badge-pill badge-info m-2 qty">
                  {quantity}
                </span>
                <span
                  className={`btn btn-primary plus ${
                    quantity >= product.stock && "disabled"
                  } `}
                  onClick={increaseQty}
                >
                  +
                </span>
              </div>

              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>
              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Login to post your review
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <Rating
                            name="simple-controlled"
                            value={rating}
                            precision={0.5}
                            size="large"
                            onChange={(event, newRating) => {
                              setRating(newRating);
                            }}
                          />

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={reviewHandler}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
