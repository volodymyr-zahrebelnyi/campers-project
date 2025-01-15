import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCampers } from "../../redux/campers/slice";
import axios from "axios";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./Catalog.module.css";

export default function Catalog() {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list);

  useEffect(() => {
    axios
      .get("https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers")
      .then((response) => dispatch(setCampers(response.data)))
      .catch((error) => console.error("Error fetching campers:", error));
  }, [dispatch]);

  return (
    <div className={css.catalog}>
      <h1>Available Campers</h1>
      <div className={css.grid}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
}
