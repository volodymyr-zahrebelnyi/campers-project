import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./Catalog.module.css";

export default function Catalog() {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading campers...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={css.catalog}>
      <div className={css.grid}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
}
