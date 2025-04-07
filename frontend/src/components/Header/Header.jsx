import SpriteIcon from "../shared/SpriteIcon";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <a href="/" className={styles.header__logoLink}>
            <SpriteIcon id="icon-logo" className={styles.header__logoIcon} />
          </a>
          <nav className={styles.header__nav}>
            <a href="#transportation" className={styles.header__navItem}>
              Цены перевозки
            </a>
            <a href="#services" className={styles.header__navItem}>
              Цены работы с упаковкой
            </a>
            <a href="#calculator" className={styles.header__navItem}>
              Калькулятор
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
