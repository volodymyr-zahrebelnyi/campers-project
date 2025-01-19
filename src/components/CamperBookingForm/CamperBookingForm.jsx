import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./CamperBookingForm.module.css";

export default function CamperBookingForm({ onSubmit }) {
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

  return (
    <div className={css.bookingFormWrap}>
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.bookingForm}>
            <div className={css.formField}>
              <Field type="text" id="name" name="name" placeholder="Name*" />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.formField}>
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
  );
}
