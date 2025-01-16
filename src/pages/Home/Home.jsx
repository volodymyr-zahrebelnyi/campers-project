import { Link } from "react-router-dom";
import css from "./Home.module.css";
import Navigation from "../../components/Navigation/Navigation";

export default function Home() {
  return (
    <div>
      <header className={css.header}>
        <Navigation />
      </header>
      <div className={css.home}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <button type="button" className={css.viewNow}>
          <Link to="/catalog">View Now</Link>
        </button>
      </div>
    </div>
  );
}
