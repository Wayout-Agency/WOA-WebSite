import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminCreateForm from "@/components/UI/AdminCreateForm";
import { useRouter } from "next/router";
import { blockSample, requestData, requiredData } from "../caseUtils";

const CreateCase = () => {
  const router = useRouter();
  const handleSend = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[1].elements],
      formElements: document.forms[1].elements,
      formData: new FormData(),
    };

    try {
      form.formElementsArray.map((el) => {
        if (el.type === "file") {
          if (el.files[0]) form.formData.append("files", el.files[0]);
        }
      });

      if (!Object.values(requestData(form)).every((item) => item)) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();
      const data_response = await client
        .post("posts/cases/", requestData(form))
        .then((res) => res.data)
        .catch(() => {
          alert("Чёт пошло по бороде c данными");
        });
      await client
        .post(`/files/cases/${data_response.value.id}/`, form.formData)
        .then(() => {
          router.push("/admin/journal/");
        })
        .catch(() => {
          alert("Чёт пошло по бороде c файлами");
        });
    } catch (_) {
      alert(
        "Не все инпуты заполнены, а если и все, то дополнительные данные тоже должны быть!"
      );
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    document.forms[1].reset();
  };

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Добавление кейса</h2>
      <AdminCreateForm
        requiredData={requiredData}
        optionalData={[{ inputs: [], title: "Фото 3", sampleIndex: 0 }]}
        blockSample={blockSample}
        handleSend={handleSend}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default CreateCase;
