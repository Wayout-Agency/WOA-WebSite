import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminCreateForm from "@/components/UI/AdminCreateForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { blockSample, requestData, requiredData } from "../cardUtils";

const AlbumsCreateCard = () => {
  const [separation, setSeparation] = useState(4);
  const router = useRouter();
  const handleSend = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[1].elements],
      formElements: document.forms[1].elements,
      price_include: [],
      model_description: [],
      formData: new FormData(),
    };

    try {
      form.formElementsArray.map((el) => {
        if (el.type === "file") {
          if (el.files[0]) form.formData.append("files", el.files[0]);
        }
        if (el.name === "price_include") {
          form.price_include.push(el.value);
        }
        if (el.name === "additional_description") {
          form.model_description.push(el.value);
        }
      });

      let createData = requestData(form);
      createData.separation = separation;

      if (!Object.values(createData).every((item) => item)) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();

      const data_response = await client
        .post("/albums/", createData)
        .then((res) => res.data)
        .catch(() => {
          alert("Чёт пошло по бороде c данными");
        });

      await client
        .post(`/files/albums/${data_response.id}/`, form.formData)
        .then(() => {
          router.push("/admin/albums/");
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
      <h2 className={styles.title}>Добавление карточки</h2>
      <AdminCreateForm
        requiredData={requiredData}
        optionalData={[
          { inputs: [], title: "Обложки", sampleIndex: 0 },
          { inputs: [], title: "Фото", sampleIndex: 1 },
          { inputs: [], title: "Описание", sampleIndex: 2 },
          { inputs: [], title: "В стоимость входит", sampleIndex: 3 },
        ]}
        blockSample={blockSample}
        handleSend={handleSend}
        handleDelete={handleDelete}
        separation={separation}
        setSeparation={setSeparation}
      />
    </div>
  );
};
export default AlbumsCreateCard;
