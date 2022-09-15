import styles from "./FeedbackForm.module.scss";
import Input from "../Input";
import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from "utils/phoneinput";
import { useState } from "react";
import ExpImage from "next/future/image";
import { Thanks } from "./Thanks";
import wayoutAPI from "services/wayoutApi";
import { enablePageScroll } from "scroll-lock";
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const FeedbackForm = ({ show, setShow, order }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [offer, setOffer] = useState("");
  const [offerError, setOfferError] = useState(false);
  const [submited, setSubmit] = useState(false);
  const clearForm = () => {
    setName("");
    setPhone("");
    setOffer("");
    setNameError(false);
    setPhoneError(false);
    setOfferError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      if (!name) setNameError(true);
      if (!phone) setPhoneError(true);

      if (order) {
        if (!offer) setOfferError(true);
        return;
      }
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
    const url = order ? "/emails/feedback-order/" : "/emails/feedback/";
    const data = order
      ? { name: name, phone: phone, offer: offer }
      : { name: name, phone: phone };
    await wayoutAPI.post(url, { email: data }).catch(() => {
      alert(
        "Наш сервис временно недоступен, но вы можете связаться с нами любым другим способом"
      );
    });

    setSubmit(true);
    await sleep(3000);
    setShow(false);
    enablePageScroll();
    await sleep(500);
    clearForm();
    setSubmit(false);
  };

  return (
    <>
      <div
        className={`${styles.feedbackFormWrapper} ${
          show ? styles.showWrapper : null
        }`}
        onClick={() => {
          setShow(!show);
          enablePageScroll();
        }}
      ></div>
      <div
        className={`${styles.feedbackForm} ${show ? styles.showForm : null}`}
      >
        <ExpImage
          src={"/static/img/close.svg"}
          alt="close"
          width={37}
          height={37}
          className={styles.mobileClose}
          onClick={async () => {
            setShow(!show);
            enablePageScroll();
            await sleep(500);
            clearForm();
            setSubmit(false);
          }}
        />
        <div
          className={`${styles.formWrapper} ${
            submited ? styles.submited : null
          }`}
        >
          <div className={styles.header}>Форма обратной связи.</div>
          <form className={styles.form}>
            <div className={styles.inputWrapper}>
              <Input
                value={name}
                placeholder="Ваше имя"
                className={`${nameError ? styles.error : null} ${
                  styles.feedbackInput
                }`}
                onChange={(e) => {
                  setNameError(false);
                  setName(e.target.value);
                }}
              />
              <div
                className={`${styles.errorText} ${
                  nameError ? styles.showErrorText : null
                }`}
              >
                Это поле обязательно для заполнения*
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <Input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => {
                  setPhoneError(false);
                  onPhoneInput(e, setPhone);
                }}
                className={`${phoneError ? styles.error : null} ${
                  styles.feedbackInput
                }`}
                onPaste={onPhonePaste}
                onKeyDown={onPhoneKeyDown}
              />
              <div
                className={`${styles.errorText} ${
                  phoneError ? styles.showErrorText : null
                }`}
              >
                Это поле обязательно для заполнения*
              </div>
            </div>
            {order ? (
              <div className={styles.inputWrapper}>
                <Input
                  value={offer}
                  placeholder="Предложение"
                  className={`${offerError ? styles.error : null} ${
                    styles.feedbackInput
                  }`}
                  onChange={(e) => {
                    setOfferError(false);
                    setOffer(e.target.value);
                  }}
                />
                <div
                  className={`${styles.errorText} ${
                    offerError ? styles.showErrorText : null
                  }`}
                >
                  Это поле обязательно для заполнения*
                </div>
              </div>
            ) : (
              <></>
            )}
            <p className={styles.alert}>
              Мы не будем названивать Вам, а напишем в WhatsApp*
            </p>
            <div className={styles.sendWrapper} onClick={handleSubmit}>
              <p className={styles.sendText}>Отправить</p>
              <ExpImage
                className={styles.sendImg}
                width={66}
                height={28}
                src={"/static/img/light_arrow.svg"}
                layout="raw"
                alt="arrow"
              />
            </div>
            <div className={styles.policy}>
              Наживмая кнопку “Отправить” вы соглашаетесь с политикой обработки
              данных.
            </div>
          </form>
        </div>
        <Thanks submited={submited} />
      </div>
    </>
  );
};
export default FeedbackForm;
