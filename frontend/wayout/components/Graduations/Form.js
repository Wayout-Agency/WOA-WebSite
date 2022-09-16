import styles from "../Main/LeadCatch/Form/Form.module.scss";
import { useState } from "react";
import RoundInput from "../UI/RoundInput";
import RoundSendButton from "../UI/RoundSendButton";
import { onPhoneKeyDown, onPhoneInput, onPhonePaste } from "utils/phoneinput";
import Link from "next/link";
import wayoutAPI from "services/wayoutApi";

const Form = () => {
  const [members, setMembers] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [membersError, setMembersError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const clearForm = () => {
    setMembers(0);
    setName("");
    setPhone("");
    setDescription("");
    setDescriptionError(false);
    setMembersError(false);
    setNameError(false);
    setPhoneError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!members || !name || !phone || !description) {
      if (!members) setMembersError(true);
      if (!name) setNameError(true);
      if (!phone) setPhoneError(true);
      if (!description) setDescriptionError(true);
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

    const data = {
      name: name,
      phone: phone,
      quantity: members,
      description: description,
    };
    clearForm();
    await wayoutAPI.post("/emails/offer/", { email: data }).catch(() => {
      alert(
        "Наш сервис временно недоступен, но вы можете связаться с нами любым другим способом"
      );
    });
  };

  return (
    <>
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
        <RoundInput
          placeholder="Опишите Ваш выпускной"
          value={description}
          className={descriptionError ? styles.error : null}
          onChange={(e) => {
            setDescriptionError(false);
            setDescription(e.target.value);
          }}
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
    </>
  );
};

export default Form;
