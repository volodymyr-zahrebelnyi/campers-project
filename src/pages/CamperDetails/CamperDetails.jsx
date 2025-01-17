import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/campers/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./CamperDetails.module.css";

export default function CamperDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { camper, status, error } = useSelector((state) => state.campers);

  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!camper) {
    return <div>No camper found.</div>;
  }

  const {
    name,
    rating,
    location,
    price,
    gallery,
    description,
    reviews,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const features = [
    { label: "Air Conditioning", value: AC },
    { label: "Bathroom", value: bathroom },
    { label: "Kitchen", value: kitchen },
    { label: "TV", value: TV },
    { label: "Radio", value: radio },
    { label: "Refrigerator", value: refrigerator },
    { label: "Microwave", value: microwave },
    { label: "Gas", value: gas },
    { label: "Water", value: water },
  ].filter((feature) => feature.value);

  const details = [
    { label: "Form", value: form },
    { label: "Length", value: length },
    { label: "Width", value: width },
    { label: "Height", value: height },
    { label: "Tank Capacity", value: tank },
    { label: "Fuel Consumption", value: consumption },
    { label: "Transmission", value: transmission },
    { label: "Engine Type", value: engine },
  ];

  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Booking Details:", values);
    resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.camperDetails}>
        <h1>{name}</h1>
        <p>Rating: {rating}</p>
        <p>Location: {location}</p>
        <p>Price: €{price.toFixed(2)}</p>
        <div className={css.imageWrap}>
          {gallery.map((image, index) => (
            <img
              key={index}
              src={image.thumb}
              alt={`${name} - ${index + 1}`}
              className={css.image}
            />
          ))}
        </div>
        <p>{description}</p>
      </div>

      <div className={css.tabs}>
        <button
          className={activeTab === "features" ? css.activeTab : css.tab}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? css.activeTab : css.tab}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={css.bottomWrap}>
        {activeTab === "features" && (
          <div className={css.features}>
            {features.length > 0 ? (
              <ul className={css.featuresWrap}>
                {features.map((feature, index) => (
                  <li key={index}>{feature.label}</li>
                ))}
              </ul>
            ) : (
              <p>No features available.</p>
            )}

            <h3>Vehicle details</h3>
            <ul className={css.detailsWrap}>
              {details.map((detail, index) => (
                <li className={css.detailsItem} key={index}>
                  <strong>{detail.label}:</strong> {detail.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
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
        )}

        <div className={css.bookingFormWrap}>
          <h2>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={css.bookingForm}>
                <div className={css.formField}>
                  <label htmlFor="name"></label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name*"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.formField}>
                  <label htmlFor="email"></label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email*"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.formField}>
                  <label htmlFor="bookingDate"></label>
                  <Field
                    id="bookingDate"
                    name="bookingDate"
                    placeholder="Booking Date*"
                  />
                  <ErrorMessage
                    name="bookingDate"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.formField}>
                  <label htmlFor="comment"></label>
                  <Field
                    as="textarea"
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={css.submitButton}
                >
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
