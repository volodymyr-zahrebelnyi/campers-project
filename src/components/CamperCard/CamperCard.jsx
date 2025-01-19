import { Link } from "react-router-dom";
import { BsSuitHeart } from "react-icons/bs";
import css from "./CamperCard.module.css";

export default function CamperCard({ camper }) {
  const { id, name, gallery, price, rating, location } = camper;
  const thumb = gallery[0]?.thumb;

  return (
    <div className={css.camperCard}>
      <div className={css.imageWrap}>
        <img src={thumb} alt={name} className={css.image} />
      </div>
      <div className={css.camperDetails}>
        <h3>{name}</h3>
        <p>Price: {price.toFixed(2)} USD</p>
        <button className={css.favorite}>
          <BsSuitHeart className={css.iconFavourite} />
        </button>
        <p>{rating}</p>

        <p>Location: {location}</p>
        <div className={css.actions}>
          <Link to={`/catalog/${id}`}>
            <button className={css.details}>Show more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
