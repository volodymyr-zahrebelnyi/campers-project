import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/campers/operations";
import CamperBookingForm from "../../components/CamperBookingForm/CamperBookingForm";
import CamperReviews from "../../components/CamperReviews/CamperReviews";
import css from "./CamperDetails.module.css";
import CamperFeaturesAndDetails from "../../components/CamperFeaturesAndDetails/CamperFeaturesAndDetails";
import CamperGallery from "../../components/CamperGallery/CamperGallery";

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
        <CamperGallery gallery={gallery} name={name} />
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
          <CamperFeaturesAndDetails features={features} details={details} />
        )}

        {activeTab === "reviews" && <CamperReviews reviews={reviews} />}

        <CamperBookingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
