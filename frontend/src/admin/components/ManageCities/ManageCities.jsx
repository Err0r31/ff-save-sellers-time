import { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import SpriteIcon from "../../../components/shared/SpriteIcon";
import Modal from "../../../components/shared/Modal/Modal";
import styles from "./ManageCities.module.scss";

const DAYS_OF_WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const ManageCities = () => {
  const API_URL = import.meta.env.VITE_CITIES_URL;
  const [cities, setCities] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "prices",
    cityId: null,
    initialData: {},
  });

  async function getCities() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  const handleEditPrices = (city) => {
    setModalState({
      isOpen: true,
      type: "prices",
      cityId: city.id,
      initialData: {
        boxPrice: city.boxPrice,
        palletPrice: city.palletPrice,
        threePalletsPrice: city.threePalletsPrice,
      },
    });
  };

  const handleEditDays = (city) => {
    setModalState({
      isOpen: true,
      type: "days",
      cityId: city.id,
      initialData: {
        deliveryDays: city.deliveryDays || [],
        shippingDays: city.shippingDays || [],
        byAgreementDelivery: city.byAgreementDelivery || false,
        byAgreementShipping: city.byAgreementShipping || false,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};

    if (modalState.type === "prices") {
      data = {
        boxPrice: formData.get("boxPrice"),
        palletPrice: formData.get("palletPrice"),
        threePalletsPrice: formData.get("threePalletsPrice"),
      };
    } else if (modalState.type === "days") {
      data = {
        deliveryDays: formData.getAll("deliveryDays"),
        shippingDays: formData.getAll("shippingDays"),
        byAgreementDelivery: formData.get("byAgreementDelivery") === "on",
        byAgreementShipping: formData.get("byAgreementShipping") === "on",
      };
    }

    try {
      const response = await fetch(`${API_URL}/${modalState.cityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при сохранении данных");
      }

      await getCities();
      setModalState((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className={styles.cities}>
        <div className="container">
          <div className={styles.cities__content}>
            <h1 className={styles.cities__title}>Управление городами</h1>
            {cities &&
              cities.map((city) => (
                <details className={styles.cities__city} key={city.id} open>
                  <summary className={styles.cities__summary}>
                    {city.name}
                  </summary>
                  <div className={styles.cities__details}>
                    <div className={styles.cities__prices}>
                      <div className={styles.cities__pricesTitleWrapper}>
                        <p className={styles.cities__pricesTitle}>Стоимость</p>
                        <button
                          type="button"
                          className={styles.cities__editButton}
                          onClick={() => handleEditPrices(city)}
                        >
                          <SpriteIcon
                            id="icon-edit"
                            className={styles.cities__editIcon}
                          />
                        </button>
                      </div>
                      <ul className={styles.cities__pricesList}>
                        <li className={styles.cities__pricesItem}>
                          1 короб: {city.boxPrice}₽
                        </li>
                        <li className={styles.cities__pricesItem}>
                          1 паллет: {city.palletPrice}₽
                        </li>
                        <li className={styles.cities__pricesItem}>
                          От 3 паллет: {city.threePalletsPrice}₽
                        </li>
                      </ul>
                    </div>
                    <div className={styles.cities__days}>
                      <div className={styles.cities__daysTitleWrapper}>
                        <p className={styles.cities__daysTitle}>
                          Дни перевозок
                        </p>
                        <button
                          type="button"
                          className={styles.cities__editButton}
                          onClick={() => handleEditDays(city)}
                        >
                          <SpriteIcon
                            id="icon-edit"
                            className={styles.cities__editIcon}
                          />
                        </button>
                      </div>
                      <div className={styles.cities__daysSection}>
                        <p className={styles.cities__daysSectionTitle}>
                          Дни доставки
                        </p>
                        <p className={styles.cities__daysDay}>
                          {city.byAgreementDelivery
                            ? "По договоренности"
                            : city.deliveryDays.join(", ")}
                        </p>
                      </div>
                      <div className={styles.cities__daysSection}>
                        <p className={styles.cities__daysSectionTitle}>
                          Дни отгрузки
                        </p>
                        <p className={styles.cities__daysDay}>
                          {city.byAgreementShipping
                            ? "По договоренности"
                            : city.shippingDays.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        title={
          modalState.type === "prices"
            ? "Редактировать стоимость"
            : "Редактировать дни"
        }
        onSubmit={handleSubmit}
        submitText="Сохранить"
      >
        {modalState.type === "prices" ? (
          <>
            <div className={styles.modal__formField}>
              <label className={styles.modal__formLabel} htmlFor="boxPrice">
                1 короб (₽)
              </label>
              <input
                className={styles.modal__formInput}
                type="text"
                name="boxPrice"
                id="boxPrice"
                defaultValue={modalState.initialData.boxPrice}
                required
                autoComplete="off"
              />
            </div>
            <div className={styles.modal__formField}>
              <label className={styles.modal__formLabel} htmlFor="palletPrice">
                1 паллет (₽)
              </label>
              <input
                className={styles.modal__formInput}
                type="text"
                name="palletPrice"
                id="palletPrice"
                defaultValue={modalState.initialData.palletPrice}
                required
                autoComplete="off"
              />
            </div>
            <div className={styles.modal__formField}>
              <label
                className={styles.modal__formLabel}
                htmlFor="threePalletsPrice"
              >
                От 3 паллет (₽)
              </label>
              <input
                className={styles.modal__formInput}
                type="text"
                name="threePalletsPrice"
                id="threePalletsPrice"
                defaultValue={modalState.initialData.threePalletsPrice}
                required
                autoComplete="off"
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.modal__formField}>
              <label className={styles.modal__formLabel} htmlFor="deliveryDays">
                Дни доставки
              </label>
              <label>
                <input
                  type="checkbox"
                  name="byAgreementDelivery"
                  defaultChecked={modalState.initialData.byAgreementDelivery}
                  onChange={(e) =>
                    setModalState((prev) => ({
                      ...prev,
                      initialData: {
                        ...prev.initialData,
                        byAgreementDelivery: e.target.checked,
                      },
                    }))
                  }
                />
                По договоренности
              </label>
              <select
                className={styles.modal__formSelect}
                name="deliveryDays"
                id="deliveryDays"
                multiple
                defaultValue={modalState.initialData.deliveryDays}
                disabled={modalState.initialData.byAgreementDelivery}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.modal__formField}>
              <label className={styles.modal__formLabel} htmlFor="shippingDays">
                Дни отгрузки
              </label>
              <label>
                <input
                  type="checkbox"
                  name="byAgreementShipping"
                  defaultChecked={modalState.initialData.byAgreementShipping}
                  onChange={(e) =>
                    setModalState((prev) => ({
                      ...prev,
                      initialData: {
                        ...prev.initialData,
                        byAgreementShipping: e.target.checked,
                      },
                    }))
                  }
                />
                По договоренности
              </label>
              <select
                className={styles.modal__formSelect}
                name="shippingDays"
                id="shippingDays"
                multiple
                defaultValue={modalState.initialData.shippingDays}
                disabled={modalState.initialData.byAgreementShipping}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ManageCities;
