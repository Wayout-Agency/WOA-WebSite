import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminCreateForm from "@/components/UI/AdminCreateForm";
import { useRouter } from "next/router";
import { blockSample, requestData, requiredData } from "../articleUtils";

const CreateArticle = () => {
  const router = useRouter();
  const handleSend = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[1].elements],
      formElements: document.forms[1].elements,
      formData: new FormData(),
    };

    try {
      let blocksInputArray = [];
      let blocksArray = [];
      const temporaryArray = form.formElementsArray.slice(
        8,
        form.formElementsArray.length - 2
      );
      for (let i = 0; i < temporaryArray.length; i += 4) {
        blocksInputArray.push(temporaryArray.slice(i, i + 4));
      }
      blocksInputArray.map((el, index) => {
        if (el[0].files[0]) form.formData.append("files", el[0].files[0]);
        blocksArray.push({
          id: index,
          video_caption: el[1].value,
          subtitle: el[2].value,
          text: el[3].value,
        });
      });

      if (
        !Object.values(requestData(form, blocksArray)).every((item) => item)
      ) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();
      const data_response = await client
        .post("posts/articles/", requestData(form, blocksArray))
        .then((res) => res.data)
        .catch(() => {
          alert("Чёт пошло по бороде c данными");
        });
      await client
        .post(`/files/articles/${data_response.value.id}/`, form.formData)
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
      <h2 className={styles.title}>Добавление статьи</h2>
      <AdminCreateForm
        requiredData={requiredData}
        optionalData={[{ inputs: [], title: "Блоки", sampleIndex: 0 }]}
        blockSample={blockSample}
        handleSend={handleSend}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default CreateArticle;
