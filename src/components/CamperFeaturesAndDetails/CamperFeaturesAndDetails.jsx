import css from "./CamperFeaturesAndDetails.module.css";

export default function CamperFeaturesAndDetails({ features, details }) {
  return (
    <div className={css.features}>
      {features.length > 0 ? (
        <ul className={css.featuresWrap}>
          {features.map((feature, index) => (
            <li key={index}>{feature.label}</li>
          ))}
        </ul>
      ) : (
        <p>No features available.</p>
      )}

      <h3>Vehicle details</h3>
      <ul className={css.detailsWrap}>
        {details.map((detail, index) => (
          <li className={css.detailsItem} key={index}>
            <strong>{detail.label}:</strong> {detail.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
