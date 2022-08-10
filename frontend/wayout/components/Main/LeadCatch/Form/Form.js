import styles from "./Form.module.scss";
import useSWR from "swr";
import wayoutAPI from "services/wayoutApi";
import Image from "next/image";
import { useState } from "react";
import RoundInput from "@/components/UI/RoundInput";
import RoundSendButton from "@/components/UI/RoundSendButton";
import { onPhoneKeyDown, onPhoneInput, onPhonePaste } from "utils/phoneinput";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      if (!name) setNameError(true);
      if (!phone) setPhoneError(true);
      return;
    }

    console.log(phone, name);
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
    </div>
  );
};

export default Form;
