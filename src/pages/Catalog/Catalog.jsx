import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./Catalog.module.css";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import CamperList from "../../components/CamperList/CamperList";

export default function Catalog() {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);
  const filters = useSelector((state) => state.filter);
  const [visibleCampers, setVisibleCampers] = useState(4);
  const [filteredCampers, setFilteredCampers] = useState([]);

  const locationOptions = [
    "All cities",
    "Ukraine, Dnipro",
    "Ukraine, Kharkiv",
    "Ukraine, Kyiv",
    "Ukraine, Lviv",
    "Ukraine, Odesa",
    "Ukraine, Poltava",
    "Ukraine, Sumy",
  ];

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const applyFilters = () => {
    const result = campers.filter((camper) => {
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

    setFilteredCampers(result);
  };

  useEffect(() => {
    setFilteredCampers(campers);
  }, [campers]);

  const handleLoadMore = () => {
    setVisibleCampers((prev) => prev + 4);
  };

  if (status === "loading") {
    return <p>Loading campers...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={css.catalog}>
      <FilterPanel
        onApplyFilters={applyFilters}
        locationOptions={locationOptions}
      />

      <CamperList
        campers={filteredCampers}
        visibleCampers={visibleCampers}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
