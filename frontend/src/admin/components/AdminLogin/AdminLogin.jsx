import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./AdminLogin.module.scss";

export default function AdminLogin({ setToken }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_LOGIN_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token)
        navigate("/admin/categories");
      } else {
        setError(data.message || "Ошибка авторизации");
      }
    } catch (err) {
      setError("Ошибка сервера", err);
    }
  };

  return (
    <div className={styles.login}>
      <div className="container">
        <div className={styles.login__content}>
          <h1 className={styles.login__title}>
            Вход в панель администрирования
          </h1>
          <form className={styles.login__form} onSubmit={handleLogin}>
            <div className={styles.login__formGroup}>
              <label htmlFor="userLogin" className={styles.login__label}>
                Логин
              </label>
              <input
                type="text"
                name="userLogin"
                id="userLogin"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className={styles.login__input}
              />
            </div>
            <div className={styles.login__formGroup}>
              <label htmlFor="userPassword" className={styles.login__label}>
                Пароль
              </label>
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.login__input}
              />
            </div>
            {error && <p className={styles.login__error}>{error}</p>}
            <button type="submit" className={styles.login__button}>
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
