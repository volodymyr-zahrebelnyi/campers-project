import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setForm, setEquipments } from "../../redux/filters/slice";
import css from "./FilterPanel.module.css";

export default function FilterPanel({ onApplyFilters, locationOptions }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className={css.filterPanel}>
      <label className={css.filterInput}>
        Location:
        <input
          type="text"
          value={filters.location}
          readOnly
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <ul className={css.dropdown}>
            {locationOptions.map((option) => (
              <li
                key={option}
                onClick={() => {
                  dispatch(setLocation(option));
                  setIsDropdownOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
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

      <button className={css.searchButton} onClick={onApplyFilters}>
        Search
      </button>
    </div>
  );
}
