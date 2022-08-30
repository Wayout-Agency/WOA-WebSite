import styles from "./Form.module.scss";
import { useState } from "react";
import RoundInput from "@/components/UI/RoundInput";
import RoundSendButton from "@/components/UI/RoundSendButton";
import { onPhoneKeyDown, onPhoneInput, onPhonePaste } from "utils/phoneinput";
import Link from "next/link";
import wayoutAPI from "services/wayoutApi";
const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const clearForm = () => {
    setName("");
    setPhone("");
    setNameError(false);
    setPhoneError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      if (!name) setNameError(true);
      if (!phone) setPhoneError(true);
      return;
    }
    if (phone.startsWith("+")) {
      if (phone.length != 18) {
        setPhoneError(true);
        console.log(phone);
        return;
      }
    }
    if (phone.length < 17) {
      setPhoneError(true);
      return;
    }

    const data = { name: name, phone: phone };
    await wayoutAPI.post("/emails/feedback/", { email: data }).catch(() => {
      alert(
        "Наш сервис временно недоступен, но вы можете связаться с нами любым другим способом"
      );
    });
    clearForm();
  };
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit}>
        <RoundInput
          placeholder={"Имя"}
          value={name}
          className={nameError ? styles.error : null}
          onChange={(e) => {
            setNameError(false);
            setName(e.target.value);
          }}
        />
        <RoundInput
          type="tel"
          placeholder={"Телефон"}
          value={phone}
          onChange={(e) => {
            setPhoneError(false);
            onPhoneInput(e, setPhone);
          }}
          className={phoneError ? styles.error : null}
          onPaste={onPhonePaste}
          onKeyDown={onPhoneKeyDown}
        />
        <RoundSendButton value={"Отправить"} />
      </form>
      <div className={styles.policy}>
        Нажимая кнопку “Отправить” вы соглашаетесь с{" "}
        <Link href="/policy">
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            политикой обработки данных.
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Form;
