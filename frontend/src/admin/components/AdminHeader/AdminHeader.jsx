import { Link } from "react-router-dom";
import styles from "./AdminHeader.module.scss";

export default function AdminHeader() {
  return (
    <header className={styles.header}>
      <div className="container">
          <ul className={styles.header__list}>
            <li className={styles.header__item}>
              <Link to="/admin/categories" className={styles.header__link}>
                Управление категориями и услугами
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link to="/admin/cities" className={styles.header__link}>
                Управление городами и ценами
              </Link>
            </li>
          </ul>
      </div>
    </header>
  );
}
