import { Link } from "react-router-dom";
import { BsSuitHeart } from "react-icons/bs";
import css from "./CamperCard.module.css";

export default function CamperCard({ camper }) {
  const { id, name, gallery, price, location } = camper;
  const thumb = gallery[0]?.thumb;

  return (
    <div className={css.card}>
      <img src={thumb} alt={name} className={css.image} />
      <div className={css.content}>
        <h3>{name}</h3>
        <p>Location: {location}</p>
        <p>Price: {price.toFixed(2)} USD</p>
        <button className={css.favorite}>
          <BsSuitHeart className={css.iconFavourite} />
        </button>
        <div className={css.actions}>
          <Link to={`/catalog/${id}`} className={css.details}>
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}
