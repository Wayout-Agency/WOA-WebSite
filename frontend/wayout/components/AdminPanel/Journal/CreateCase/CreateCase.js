import styles from "../../Albums/Albums.module.scss";
import panelStyles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminCreateForm from "@/components/UI/AdminCreateForm";
import { useRouter } from "next/router";

const JournalCreateCase = () => {
  const router = useRouter();
  const handleSend = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[0].elements],
      formElements: document.forms[0].elements,
      formData: new FormData(),
    };

    try {
      form.formElementsArray.map((el) => {
        if (el.type === "file") {
          if (el.files[0]) form.formData.append("files", el.files[0]);
        }
      });

      let data = {
        value: {
          title: form.formElements["title"].value,
          description: form.formElements["description"].value,
          created_at: form.formElements["created_at"].value,
          time_to_read: form.formElements["time_to_read"].value,
          slug: form.formElements["slug"].value,
          task: form.formElements["task"].value,
          process: form.formElements["process"].value,
        },
      };

      if (!Object.values(data).every((item) => item)) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();
      const data_response = await client
        .post("posts/cases/", data)
        .then((res) => res.data)
        .catch((_) => {
          alert("Чёт пошло по бороде c данными");
        });
      await client
        .post(`/files/cases/${data_response.value.id}/`, form.formData)
        .then((_) => {
          router.push("/admin/journal/");
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
      <h2 className={panelStyles.title}>Добавление кейса</h2>
      <AdminCreateForm
        requiredData={[
          { placeholder: "Название", name: "title" },
          {
            placeholder: "Описание проекта (серый текст)",
            name: "description",
          },
          {
            placeholder: "Дата публикации",
            name: "created_at",
            type: "date",
          },
          {
            placeholder: "Время прочтения",
            name: "time_to_read",
            type: "number",
          },
          { placeholder: "Ссылка (транслит)", name: "slug" },
          {
            placeholder: "Главное фото (Превью и Большое при нажатии)",
            name: "file_0",
            type: "file",
          },
          { placeholder: "Задача", name: "task" },
          { placeholder: "Фото 2", name: "file_1", type: "file" },
          { placeholder: "Фото вертикальное 1", name: "file_2", type: "file" },
          {
            placeholder: "Фото вертикальное 2",
            name: "file_3",
            type: "file",
          },
          { placeholder: "Фото 3 Превью", name: "file_4", type: "file" },
          { placeholder: "Процесс", name: "process" },
          { placeholder: "Фото 4", name: "file_5", type: "file" },
        ]}
        optionalData={[{ inputs: [], title: "Фото 3", sampleIndex: 0 }]}
        blockSample={(i, sampleIndex) => {
          return [
            [
              {
                type: "file",
                placeholder: `Слайд ${i}*`,
                name: `file_${6 + i}`,
              },
            ],
          ][sampleIndex];
        }}
        handleSend={handleSend}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default JournalCreateCase;
