import styles from "../Main/LeadCatch/Form/Form.module.scss";
import { useState } from "react";
import RoundInput from "../UI/RoundInput";
import RoundSendButton from "../UI/RoundSendButton";
import { onPhoneKeyDown, onPhoneInput, onPhonePaste } from "utils/phoneinput";
import Link from "next/link";

const Form = () => {
  const [members, setMembers] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [membersError, setMembersError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const clearForm = () => {
    setMembers(0);
    setName("");
    setPhone("");
    setMembersError(false);
    setNameError(false);
    setPhoneError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!members || !name || !phone) {
      if (!members) setMembersError(true);
      if (!name) setNameError(true);
      if (!phone) setPhoneError(true);
      return;
    }
    console.log(members, phone, name);
    clearForm();
  };

  return (
    <>
      {/* FIXME: submit doesn't work */}
      <form onSubmit={handleSubmit} style={{ marginTop: 50 }}>
        <RoundInput
          placeholder="Кол-во участников"
          value={members}
          className={membersError ? styles.error : null}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setMembersError(false);
              setMembers(e.target.value);
            }
          }}
        />
        <RoundInput
          placeholder="Ваше имя"
          value={name}
          className={nameError ? styles.error : null}
          onChange={(e) => {
            setNameError(false);
            setName(e.target.value);
          }}
        />
        <RoundInput
          type="tel"
          placeholder="Телефон"
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
        Нажимая кнопку “Отправить” вы соглашаетесь с
        <Link href="/policy">
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            политикой обработки данных.
          </span>
        </Link>
      </div>
    </>
  );
};

export default Form;
