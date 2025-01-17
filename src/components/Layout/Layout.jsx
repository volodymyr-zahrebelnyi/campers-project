import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import appLogo from "../../assets/app-logo.png";
import css from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <header className={css.header}>
        <a href="/">
          <img src={appLogo} alt="logo" />
        </a>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
