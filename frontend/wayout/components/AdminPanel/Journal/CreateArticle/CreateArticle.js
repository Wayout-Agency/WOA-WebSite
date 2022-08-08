import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminCreateForm from "@/components/UI/AdminCreateForm";
import { useRouter } from "next/router";

const CreateArticle = () => {
  const router = useRouter();
  const handleSend = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[0].elements],
      formElements: document.forms[0].elements,
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

      let data = {
        value: {
          title: form.formElements["title"].value,
          author: form.formElements["author"].value,
          created_at: form.formElements["created_at"].value,
          time_to_read: form.formElements["time_to_read"].value,
          slug: form.formElements["slug"].value,
          introduction: form.formElements["introduction"].value,
          blocks: JSON.stringify(blocksArray),
        },
      };

      if (!Object.values(data).every((item) => item)) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();
      const data_response = await client
        .post("posts/articles/", data)
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
    document.forms[0].reset();
  };

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Добавление статьи</h2>
      <AdminCreateForm
        requiredData={[
          { placeholder: "Название", name: "title" },
          { placeholder: "Имя автора", name: "author" },
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
            placeholder: "Текст 0 (Вступление)",
            name: "introduction",
            type: "text",
          },
        ]}
        optionalData={[{ inputs: [], title: "Блоки", sampleIndex: 0 }]}
        blockSample={(i, sampleIndex) => {
          return [
            [
              {
                type: "file",
                placeholder: `Добавить фото/видео ${i}`,
                name: `file_${i}`,
              },
              {
                type: "text",
                placeholder: `Подпись к фото/видео ${i}`,
                name: `video_caption__${i}`,
              },
              {
                type: "text",
                placeholder: `Подзаголовок ${i}`,
                name: `subtitle_${i}`,
              },
              {
                type: "text",
                placeholder: `Текст ${i}`,
                name: `text_${i}`,
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
export default CreateArticle;
