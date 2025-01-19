import css from "./CamperReviews.module.css";

export default function CamperReviews({ reviews }) {
  return (
    <div>
      <h3>Reviews</h3>
      {reviews && reviews.length > 0 ? (
        <div className={css.reviews}>
          {reviews.map((review, index) => (
            <div key={index} className={css.review}>
              <p>
                <strong>{review.reviewer_name}</strong> (
                {review.reviewer_rating}/5)
              </p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
