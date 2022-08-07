import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminCreateForm from "@/components/UI/AdminCreateForm";
import { useRouter } from "next/router";

const CreateQuestionService = ({ type }) => {
  let title = type === "question" ? "вопроса" : "услуги";
  let title_placeholder = type === "question" ? "Вопрос" : "Услуга";
  let text_placeholder = type === "question" ? "Ответ" : "Описание";
  const router = useRouter();

  const handleSend = async (e) => {
    e.preventDefault();
    let formElements = document.forms[0].elements;

    try {
      let data = {
        title: formElements["title"].value,
        text: formElements["text"].value,
        type: type,
      };

      if (!Object.values(data).every((item) => item)) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();
      await client
        .post("/questions-services/", data)
        .then((_) => router.push("/admin/albums/"))
        .catch((_) => {
          alert("Чёт пошло по бороде c данными");
        });
    } catch (_) {
      alert(
        "Не все инпуты заполнены, а если и все, то дополнительные данные тоже должны быть!"
      );
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    document.forms[0].reset();
  };

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Добавление {title}</h2>
      <AdminCreateForm
        requiredData={[
          { placeholder: title_placeholder, name: "title" },
          { placeholder: text_placeholder, name: "text" },
        ]}
        blockSample={() => {}}
        handleSend={handleSend}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default CreateQuestionService;
