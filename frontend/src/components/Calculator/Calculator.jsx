import { useState } from "react";
import Select from "react-select";
import styles from "./Calculator.module.scss";

export default function Calculator({ services }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [multiplier, setMultiplier] = useState(1);

  const serviceOptions = services.map((service) => ({
    value: service.id,
    label: `${service.name}`,
    price: service.price,
  }));

  const calculateTotal = () => {
    const total = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );
    return total * multiplier;
  };

  const handleMultiplierChange = (e) => {
    const value = e.target.value;

    if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setMultiplier(value === "" ? 1 : parseInt(value));
    }
  };

  if (!services.length) {
    return (
      <div className={styles.calculator}>
        <div className="container">
          <div className={styles.calculator__wrapper}>
            <h1 className={styles.calculator__title}>Калькулятор услуг</h1>
            <p className={styles.calculator__description}>
              Нет доступных услуг с указанными числовыми ценами
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.calculator} id="calculator">
      <div className="container">
        <div className={styles.calculator__wrapper}>
          <h1 className={styles.calculator__title}>Калькулятор услуг</h1>
          <div className={styles.calculator__controls}>
            <div className={styles.calculator__selectWrapper}>
              <Select
                isMulti
                options={serviceOptions}
                value={selectedServices}
                onChange={setSelectedServices}
                placeholder="Выберите услуги..."
                className={styles.calculator__select}
                classNamePrefix="react-select"
                noOptionsMessage={() => "Услуги не найдены"}
                closeMenuOnSelect={false}
              />
            </div>
            <div className={styles.calculator__customInput}>
              <label htmlFor="multiplier" className={styles.calculator__label}>
                Количество:
              </label>
              <input
                type="number"
                id="multiplier"
                name="multiplier"
                value={multiplier}
                onChange={handleMultiplierChange}
                min="1"
                step="1"
                className={styles.calculator__input}
              />
            </div>
            <div className={styles.calculator__result}>
              <p className={styles.calculator__resultText}>
                Итого:{" "}
                <span className={styles.calculator__resultNumber}>
                  {calculateTotal().toLocaleString()}₽
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
