import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import Rating from "@material-ui/lab/Rating";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, alert, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Best Product Online"} />

          <h1 id="products_heading"> Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: "true",
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="my-3" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((c) => (
                            <li
                              style={{ cursor: "pointer", listStyle: "none" }}
                              className={category === c && "active-category"}
                              key={c}
                              onClick={() => setCategory(c)}
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{ cursor: "pointer", listStyle: "none" }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <Rating
                                name="read-only"
                                value={star}
                                precision={0.1}
                                readOnly
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                lastPageText={"Last"}
                firstPageText={"First"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
