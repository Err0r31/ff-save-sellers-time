import { useState, useEffect } from "react";

import AdminHeader from "../AdminHeader/AdminHeader";
import SpriteIcon from "../../../components/shared/SpriteIcon";
import Modal from "../../../components/shared/Modal/Modal";

import styles from "./ManageServices.module.scss";

const ManageCategories = () => {
  const API_URL = import.meta.env.VITE_CATEGORIES_URL;
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "form",
    categoryId: null,
    serviceId: null,
    initialData: {},
  });

  async function getCategories() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Ошибка при загрузке категорий");
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateService = (categoryId) => {
    setModalState({
      isOpen: true,
      type: "form",
      categoryId,
      serviceId: null,
      initialData: { name: "", price: "" },
    });
  };

  const handleEditService = (categoryId, service) => {
    setModalState({
      isOpen: true,
      type: "form",
      categoryId,
      serviceId: service.id,
      initialData: { name: service.name, price: service.price },
    });
  };

  const handleDeleteService = (categoryId, serviceId) => {
    setModalState({
      isOpen: true,
      type: "confirm",
      categoryId,
      serviceId,
      initialData: {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      CategoryId: modalState.categoryId,
    };

    try {
      let response;
      if (modalState.serviceId) {
        response = await fetch(`${API_URL}/services/${modalState.serviceId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch(`${API_URL}/services`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при сохранении услуги");
      }

      await getCategories();
      setModalState((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}/services/${modalState.serviceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при удалении услуги");
      }

      await getCategories();
      setModalState((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error(error);
      alert(`Произошла ошибка: ${error.message}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className={styles.categories}>
        <div className="container">
          <div className={styles.categories__content}>
            <h1 className={styles.categories__title}>Управление услугами</h1>
            {categories &&
              categories.map((category, categoryIndex) => (
                <details
                  className={styles.categories__category}
                  key={category.id || categoryIndex}
                  open
                >
                  <summary className={styles.categories__summary}>
                    {category.name}
                    <button
                      type="button"
                      className={styles.categories__categoryButton}
                      onClick={() => handleCreateService(category.id)}
                    >
                      +
                    </button>
                  </summary>
                  <ul className={styles.categories__services}>
                    {category.services.map((service, serviceIndex) => (
                      <li
                        className={styles.categories__service}
                        key={service.id || serviceIndex}
                      >
                        <div className={styles.categories__serviceInfo}>
                          <span className={styles.categories__serviceName}>
                            {service.name}
                          </span>
                          <span className={styles.categories__servicePrice}>
                            {service.price}
                          </span>
                        </div>
                        <div className={styles.categories__serviceButtons}>
                          <button
                            type="button"
                            className={styles.categories__editButton}
                            onClick={() =>
                              handleEditService(category.id, service)
                            }
                          >
                            <SpriteIcon
                              id="icon-edit"
                              className={styles.categories__editIcon}
                            />
                          </button>
                          <button
                            type="button"
                            className={styles.categories__deleteButton}
                            onClick={() =>
                              handleDeleteService(category.id, service.id)
                            }
                          >
                            <SpriteIcon
                              id="icon-delete"
                              className={styles.categories__deleteIcon}
                            />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        title={
          modalState.type === "confirm"
            ? "Подтверждение удаления"
            : modalState.serviceId
            ? "Редактировать услугу"
            : "Добавить услугу"
        }
        onSubmit={
          modalState.type === "confirm" ? handleConfirmDelete : handleSubmit
        }
        type={modalState.type}
        submitText={modalState.type === "confirm" ? "Удалить" : "Сохранить"}
      >
        {modalState.type === "form" ? (
          <>
            <div className={styles.modal__formField}>
              <label className={styles.modal__formLabel} htmlFor="name">
                Название
              </label>
              <input
                className={styles.modal__formInput}
                type="text"
                name="name"
                id="name"
                defaultValue={modalState.initialData.name}
                required
                autoComplete="off"
              />
            </div>
            <div className={styles.modal__formField}>
              <label htmlFor="price" className={styles.modal__formLabel}>
                Цена (₽)
              </label>
              <input
                className={styles.modal__formInput}
                type="text"
                name="price"
                id="price"
                defaultValue={modalState.initialData.price}
                required
                autoComplete="off"
              />
            </div>
          </>
        ) : (
          <p className={styles.modal__desc}>
            Вы уверены, что хотите удалить эту услугу?
          </p>
        )}
      </Modal>
    </>
  );
};

export default ManageCategories;
