import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/campers/operations";
import css from "./CamperDetails.module.css";

export default function CamperDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { camper, status, error } = useSelector((state) => state.campers);

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

  const { name, rating, location, price, gallery, description } = camper;

  return (
    <div className={css.details}>
      <h3>{name}</h3>
      <p>{rating}</p>
      <p>{location}</p>
      <p>€{price.toFixed(2)}</p>
      <div className={css.imageWrap}>
        {gallery.map((image, index) => (
          <img key={index} src={image.thumb} alt={name} className={css.image} />
        ))}
      </div>
      <p>{description}</p>
    </div>
  );
}
