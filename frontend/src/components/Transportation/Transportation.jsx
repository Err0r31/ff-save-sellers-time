import React, { useEffect, useState } from "react";
import SpriteIcon from "../shared/SpriteIcon";
import styles from "./Transportation.module.scss";

export default function Transportation() {
  const API_URL = import.meta.env.VITE_CITIES_URL;
  const [cities, setCities] = useState([]);

  async function getCities() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Ошибка при загрузке городов");
      } else {
        setCities(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className={styles.transportation}>
      <div className="container">
        <div className={styles.transportation__wrapper}>
          <h1 className={styles.transportation__title}>Цены перевозки</h1>
          <ul className={styles.transportation__cities}>
            {cities &&
              cities.map((city) => (
                <li className={styles.transportation__city} key={city.id}>
                  <h2 className={styles.transportation__cityTitle}>
                    {city.name}
                  </h2>
                  <div className={styles.transportation__blocks}>
                    <div className={styles.transportation__blockVertical}>
                      <div className={styles.transportation__shipment}>
                        <p className={styles.transportation__blockTitle}>
                          Дни отгрузки со склада:
                        </p>
                        <ul className={styles.transportation__blockList}>
                          {city.byAgreementDelivery ? (
                            <li
                              className={styles.transportation__blockItem}
                              key={`${city.id}-delivery-agreement`}
                            >
                              <SpriteIcon
                                id="icon-calendar"
                                width={24}
                                height={24}
                              />
                              По договоренности
                            </li>
                          ) : (
                            city.deliveryDays.map((day, index) => (
                              <li
                                className={styles.transportation__blockItem}
                                key={`${city.id}-delivery-${index}`}
                              >
                                <SpriteIcon
                                  id="icon-calendar"
                                  width={24}
                                  height={24}
                                />
                                {day}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      <div className={styles.transportation__delivery}>
                        <p className={styles.transportation__blockTitle}>
                          День доставки на склад маркетплейса:
                        </p>
                        <ul className={styles.transportation__blockList}>
                          {city.byAgreementShipping ? (
                            <li
                              className={styles.transportation__blockItem}
                              key={`${city.id}-shipping-agreement`}
                            >
                              <SpriteIcon
                                id="icon-calendar"
                                width={24}
                                height={24}
                              />
                              По договоренности
                            </li>
                          ) : (
                            city.shippingDays.map((day, index) => (
                              <li
                                className={styles.transportation__blockItem}
                                key={`${city.id}-shipping-${index}`}
                              >
                                <SpriteIcon
                                  id="icon-calendar"
                                  width={24}
                                  height={24}
                                />
                                {day}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.transportation__block}>
                      <p className={styles.transportation__blockTitle}>
                        Стоимость:
                      </p>
                      <ul className={styles.transportation__blockList}>
                        <li
                          className={styles.transportation__blockItem}
                          key={`${city.id}-box`}
                        >
                          1 короб -{" "}
                          <span className={styles.transportation__costPrice}>
                            {city.boxPrice}
                          </span>
                          ₽
                        </li>
                        <li
                          className={styles.transportation__blockItem}
                          key={`${city.id}-pallet`}
                        >
                          1 палет -{" "}
                          <span className={styles.transportation__costPrice}>
                            {city.palletPrice}
                          </span>
                          ₽
                        </li>
                        <li
                          className={styles.transportation__blockItem}
                          key={`${city.id}-three-pallets`}
                        >
                          от 3 палет -{" "}
                          <span className={styles.transportation__costPrice}>
                            {city.threePalletsPrice}
                          </span>
                          ₽
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
