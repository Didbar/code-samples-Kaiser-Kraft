import React from "react";
import Rating from "@material-ui/lab/Rating";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />

      {reviews &&
        reviews.map((review) => (
          <div className="review-card my-3" key={review._id}>
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.1}
              readOnly
            />
            <p className="review_user">By {review.name}</p>
            <p className="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
