import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminCreateForm from "@/components/UI/AdminCreateForm";
import { useState } from "react";
import { useRouter } from "next/router";

const AlbumsCreateCard = () => {
  const [separation, setSeparation] = useState(4);
  const router = useRouter();
  const handleSend = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[0].elements],
      formElements: document.forms[0].elements,
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

      let data = {
        title: form.formElements["title"].value,
        description: form.formElements["description"].value,
        new_price: form.formElements["new_price"].value,
        old_price: form.formElements["old_price"].value,
        sale_text: form.formElements["sale_text"].value,
        slug: form.formElements["slug"].value,
        price_include: JSON.stringify(form.price_include),
        model_description: JSON.stringify(form.model_description),
        separation: separation,
      };

      if (!Object.values(data).every((item) => item)) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();

      const data_response = await client
        .post("/albums/", data)
        .then((res) => res.data)
        .catch((_) => {
          alert("Чёт пошло по бороде c данными");
        });

      await client
        .post(`/files/albums/${data_response.id}/`, form.formData)
        .then((_) => {
          router.push("/admin/albums/");
        })
        .catch((_) => {
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
    document.forms[0].reset();
  };

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Добавление карточки</h2>
      <AdminCreateForm
        requiredData={[
          { placeholder: "Название", name: "title" },
          { placeholder: "Описание модели", name: "description" },
          { placeholder: "Цена актуальная", name: "new_price", type: "number" },
          { placeholder: "Цена старая", name: "old_price", type: "number" },
          { placeholder: "Текст про скидку", name: "sale_text" },
          { placeholder: "Ссылка (транслит)", name: "slug" },
          {
            placeholder: "Главное фото (Превью)",
            name: "0_file",
            type: "file",
          },
          { placeholder: "Обложка 0", name: "1_file", type: "file" },
          { placeholder: "Фото 1", name: "2_file", type: "file" },
          { placeholder: "Видеофайл", name: "3_file", type: "file" },
        ]}
        optionalData={[
          { inputs: [], title: "Обложки", sampleIndex: 0 },
          { inputs: [], title: "Фото", sampleIndex: 1 },
          { inputs: [], title: "Описание", sampleIndex: 2 },
          { inputs: [], title: "В стоимость входит", sampleIndex: 3 },
        ]}
        blockSample={(i, sampleIndex) => {
          return [
            [
              {
                type: "file",
                placeholder: `Обложка ${i}*`,
                name: `1_file_${i}`,
              },
            ],
            [
              {
                type: "file",
                placeholder: `Фото ${i}*`,
                name: `2_file_${i}`,
              },
            ],
            [
              {
                placeholder: `Описание ${i}*`,
                name: "additional_description",
              },
            ],
            [
              {
                placeholder: `В стоимость входит ${i}*`,
                name: "price_include",
              },
            ],
          ][sampleIndex];
        }}
        handleSend={handleSend}
        handleDelete={handleDelete}
        separation={separation}
        setSeparation={setSeparation}
      />
    </div>
  );
};
export default AlbumsCreateCard;
