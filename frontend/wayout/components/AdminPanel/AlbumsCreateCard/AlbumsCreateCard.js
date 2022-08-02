import styles from "./AlbumsCreateCard.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminForm from "@/components/UI/AdminForm";

const AlbumsCreateCard = () => {
  const handleSend = async (e, inputsLen) => {
    e.preventDefault();
    let formElements = document.forms[0].elements;
    let form = document.forms[0];
    let formData = new FormData();
    let price_include = [];
    let model_description = [];
    try {
      [...Array(4).keys()].map((i) => {
        formData.append("files", formElements.namedItem(`${i}_file`).files[0]);
      });

      inputsLen[0].map((i) => {
        formData.append(
          "files",
          formElements.namedItem(`1_file_${i}`).files[0]
        );
      });

      inputsLen[1].map((i) => {
        formData.append(
          "files",
          formElements.namedItem(`2_file_${i}`).files[0]
        );
      });

      inputsLen[2].map((i) => {
        model_description.push(
          formElements.namedItem(`description_${i}`).value
        );
      });

      inputsLen[3].map((i) => {
        price_include.push(formElements.namedItem(`price_include_${i}`).value);
      });

      let data = {
        title: formElements.namedItem("title").value,
        description: formElements.namedItem("description").value,
        new_price: formElements.namedItem("new_price").value,
        old_price: formElements.namedItem("old_price").value,
        sale_text: formElements.namedItem("sale_text").value,
        slug: formElements.namedItem("slug").value,
        price_include: JSON.stringify(price_include),
        model_description: JSON.stringify(model_description),
        separation: 4 + inputsLen[0].length,
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
        .post(`/albums/${data_response.id}/file/`, formData)
        .then((_) => {
          form.reset();
          alert("Всё ок");
        })
        .catch((_) => {
          alert("Чёт пошло по бороде c файлами");
        });
    } catch (e) {
      alert(
        "Не все инпуты заполнены, а если и все, то дополнительные данные тоже должны быть!"
      );
    }
  };
  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Добавление карточки</h2>
      <AdminForm
        required_data={[
          { placeholder: "Название", name: "title" },
          { placeholder: "Описание модели", name: "description" },
          { placeholder: "Цена акутальная", name: "new_price", type: "number" },
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
        optional_data={[
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
                name: `description_${i}`,
              },
            ],
            [
              {
                placeholder: `В стоимость входит ${i}*`,
                name: `price_include_${i}`,
              },
            ],
          ][sampleIndex];
        }}
        handleSend={handleSend}
        handleDelete={(e) => {
          e.preventDefault();
          document.forms[0].reset();
        }}
      />
    </div>
  );
};
export default AlbumsCreateCard;
