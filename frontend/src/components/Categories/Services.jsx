import { useEffect, useState } from "react";
import Calculator from "../Calculator/Calculator";
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

  const parsePrice = (price) => {
    if (typeof price === "number") return price;

    if (typeof price !== "string") return null;

    const cleanedPrice = price.replace(/[^0-9]/g, "").replace(/^0+/, "");

    if (!cleanedPrice) return null;

    return parseInt(cleanedPrice, 10);
  };

  const allServices = categories
    .flatMap((category) =>
      category.services.map((service, index) => ({
        id: `${category.id}-service-${index}`,
        name: service.name,
        price: parsePrice(service.price),
      }))
    )
    .filter((service) => service.price !== null);

  return (
    <>
    <div className={styles.services} id="services">
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
    <Calculator services={allServices} />
    </>
  );
}
