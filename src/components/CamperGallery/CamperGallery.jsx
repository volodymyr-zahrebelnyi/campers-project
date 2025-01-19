import css from "./CamperGallery.module.css";

export default function CamperGallery({ gallery, name }) {
  return (
    <div className={css.imageWrap}>
      {gallery.map((image, index) => (
        <img
          key={index}
          src={image.thumb}
          alt={`${name} - ${index + 1}`}
          className={css.image}
        />
      ))}
    </div>
  );
}
