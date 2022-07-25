import { useState } from "react";
import styles from "./AuthForm.module.scss";
import wayoutAPI from "services/wayoutApi";
import { setTokens } from "utils/tokens";

const AuthForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await wayoutAPI
      .post("/token/", { login: login, password: password })
      .then((res) => {
        setTokens(res.data);
        window.location.reload();
      })
      .catch((_) => {
        setLogin("А МОЖЕТ ТЫ ВООБЩЕ НЕ АДМИН");
      });
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.authTitle}>Авторизация</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={login}
          className={styles.input}
          onChange={(e) => setLogin(e.target.value)}
          name="login"
          type="text"
          placeholder="Login"
        />
        <input
          value={password}
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input type="submit" value="Отправить" className={styles.inputSubmit} />
      </form>
    </div>
  );
};

export default AuthForm;
