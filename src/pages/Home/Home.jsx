import { Link } from "react-router-dom";
import css from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={css.home}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <button type="button" className={css.viewNow}>
          <Link to="/catalog">View Now</Link>
        </button>
      </section>
    </>
  );
}
