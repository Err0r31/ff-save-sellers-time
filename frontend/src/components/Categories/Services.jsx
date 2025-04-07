import { useEffect, useState } from "react";
import styles from "./Services.module.scss";

export default function Services() {
  const API_URL = import.meta.env.VITE_CATEGORIES_URL;
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Ошибка при загрузке услуг");
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.services}>
      <div className="container">
        <div className={styles.services__wrapper}>
          <h1 className={styles.services__title}>Услуги</h1>
          <ul className={styles.services__list}>
            {categories &&
              categories.map((category) => (
                <li className={styles.services__item} key={category.id}>
                  <h2 className={styles.services__subtitle}>{category.name}</h2>
                  <ul className={styles.services__serviceList}>
                    {category.services.map((service, index) => (
                      <li
                        className={styles.services__serviceItem}
                        key={`${category.id}-service-${index}`}
                      >
                        <p className={styles.services__name}>{service.name}</p>
                        <p className={styles.services__price}>
                          {service.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
