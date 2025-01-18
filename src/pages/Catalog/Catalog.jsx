import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  setEquipments,
  clearFilters,
} from "../../redux/filters/slice";
import { fetchCampers } from "../../redux/campers/operations";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./Catalog.module.css";

export default function Catalog() {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);
  const filters = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const applyFilters = () => {
    return campers.filter((camper) => {
      const matchesLocation = filters.location
        ? camper.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      const matchesForm = filters.form ? camper.form === filters.form : true;

      const matchesEquipments = Object.entries(filters.equipments).every(
        ([key, value]) => {
          if (key === "transmission") {
            return value ? camper.transmission === value : true;
          }
          return !value || camper[key];
        }
      );

      return matchesLocation && matchesForm && matchesEquipments;
    });
  };

  const filteredCampers = applyFilters();

  if (status === "loading") {
    return <p>Loading campers...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const equipmentFilters = [
    { key: "AC", label: "AC" },
    { key: "transmission", label: "Automatic" },
    { key: "kitchen", label: "Kitchen" },
    { key: "TV", label: "TV" },
    { key: "bathroom", label: "Bathroom" },
  ];

  const vehicleTypes = [
    { value: "fullyIntegrated", label: "Fully Integrated" },
    { value: "panelTruck", label: "Panel Truck" },
    { value: "alcove", label: "Alcove" },
  ];

  return (
    <div className={css.catalog}>
      <div className={css.filterPanel}>
        <label className={css.filterInput}>
          Location:
          <input
            type="text"
            value={filters.location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
          />
        </label>

        <h3>Vehicle Equipment</h3>
        {equipmentFilters.map(({ key, label }) => (
          <label key={key} className={css.filterCheckbox}>
            <input
              type="checkbox"
              checked={filters.equipments[key]}
              onChange={() =>
                dispatch(
                  setEquipments({
                    ...filters.equipments,
                    [key]:
                      key === "transmission"
                        ? filters.equipments[key] === "automatic"
                          ? ""
                          : "automatic"
                        : !filters.equipments[key],
                  })
                )
              }
            />
            <span>{label}</span>
          </label>
        ))}

        <h3>Vehicle Type</h3>
        {vehicleTypes.map(({ value, label }) => (
          <label key={value} className={css.filterRadio}>
            <input
              type="radio"
              name="form"
              value={value}
              checked={filters.form === value}
              onChange={() => dispatch(setForm(value))}
            />
            {label}
          </label>
        ))}

        <button
          className={css.clearButton}
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </button>
      </div>

      <div className={css.grid}>
        {filteredCampers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
}
