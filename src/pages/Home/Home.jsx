import { Link } from "react-router-dom";
import css from "./Home.module.css";
import Navigation from "../../components/Navigation/Navigation";
import appLogo from "../../assets/app-logo.png";

export default function Home() {
  return (
    <>
      <header className={css.header}>
        <a href="/">
          <img src={appLogo} alt="logo" />
        </a>
        <Navigation />
      </header>
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
