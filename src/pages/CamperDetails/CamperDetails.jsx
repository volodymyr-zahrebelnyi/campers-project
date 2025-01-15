import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./CamperDetails.module.css";

export default function CamperDetails() {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);

  useEffect(() => {
    axios
      .get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`)
      .then((response) => setCamper(response.data))
      .catch((error) => console.error("Error fetching camper details:", error));
  }, [id]);

  if (!camper) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.details}>
      <h1>{camper.name}</h1>
      <img src={camper.image} alt={camper.name} className={css.image} />
      <p>{camper.description}</p>
      <h3>Details:</h3>
      <ul>
        {Object.entries(camper.details).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
