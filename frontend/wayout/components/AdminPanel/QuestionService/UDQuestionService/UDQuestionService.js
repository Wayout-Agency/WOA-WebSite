import styles from "../../AdminPanel.module.scss";
import AdminUDForm from "@/components/UI/AdminUDForm";
import { useRouter } from "next/router";
import { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";

const UDQuestionService = ({ id }) => {
  const questionServiceApiUrl = `/questions-services/${id}/`;

  const router = useRouter();

  const handleSend = async (e) => {
    e.preventDefault();
    let formElements = document.forms[0].elements;

    try {
      let newData = {
        title: formElements["title"].value,
        text: formElements["text"].value,
        type: data.type,
      };

      if (!Object.values(newData).every((item) => item)) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();
      await client
        .put(questionServiceApiUrl, newData)
        .then(() => window.location.reload())
        .catch((_) => {
          alert("Чёт пошло по бороде c данными");
        });
    } catch (_) {
      alert(
        "Не все инпуты заполнены, а если и все, то дополнительные данные тоже должны быть!"
      );
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const client = await rootWayoutAPI();
    await client
      .delete(questionServiceApiUrl)
      .then(() => router.push("/admin/albums/"))
      .catch((_) => {
        alert("Чет даные не удаляются(");
      });
  };

  const fetcher = async () => {
    const client = await rootWayoutAPI();
    let response = await client.get(questionServiceApiUrl);
    return response.data;
  };

  const { data, error } = useSWR(questionServiceApiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Редактирование №{id}</h2>
      <AdminUDForm
        requiredData={[
          {
            placeholder: "title_placeholder",
            name: "title",
            value: data.title,
          },
          { placeholder: "text_placeholder", name: "text", value: data.text },
        ]}
        blockSample={() => {}}
        handleSend={handleSend}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default UDQuestionService;
