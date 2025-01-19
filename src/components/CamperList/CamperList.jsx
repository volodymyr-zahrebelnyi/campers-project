import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./CamperList.module.css";

export default function CamperList({ campers, visibleCampers, onLoadMore }) {
  return (
    <div className={css.campersWrap}>
      <div className={css.campersCardWrap}>
        {campers.slice(0, visibleCampers).map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
        {campers.length === 0 && (
          <p className={css.noResults}>
            No campers match the selected filters.
          </p>
        )}
      </div>
      {visibleCampers < campers.length && (
        <button className={css.loadMoreButton} onClick={onLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
