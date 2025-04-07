import styles from "./Modal.module.scss";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "Сохранить",
  cancelText = "Отмена",
  type = "form",
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.modal__title}>{title}</h2>
        {type === "form" ? (
          <form onSubmit={onSubmit} className={styles.modal__form}>
            <div className={styles.modal__content}>{children}</div>
            <div className={styles.modal__buttons}>
              <button className={styles.modal__submitButton} type="submit">
                {submitText}
              </button>
              <button
                className={styles.modal__cancelButton}
                onClick={onClose}
                type="button"
              >
                {cancelText}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.modal__content}>{children}</div>
            <div className={styles.modal__buttons}>
              <button className={styles.modal__submitButton} onClick={onSubmit}>
                {submitText}
              </button>
              <button className={styles.modal__cancelButton} onClick={onClose}>
                {cancelText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
