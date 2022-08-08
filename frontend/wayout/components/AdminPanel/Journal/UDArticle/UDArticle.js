import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminUDForm from "@/components/UI/AdminUDForm";
import { useRouter } from "next/router";
import useSWR from "swr";

const UDArticle = ({ id }) => {
  const router = useRouter();

  const articleApiUrl = `/posts/articles/${id}/`;
  const articleApiFileUrl = `/files/articles/${id}/`;

  const handleUpdate = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[0].elements],
      formElements: document.forms[0].elements,
      formData: new FormData(),
    };

    try {
      let indexes = "";
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
        if (el[0].files[0]) {
          form.formData.append("files", el[0].files[0]);
          indexes = indexes + String(index);
        }
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
      await client.put(articleApiUrl, data).catch(() => {
        alert("Чёт пошло по бороде c данными");
      });
      if (indexes) {
        await client
          .put(articleApiFileUrl, form.formData, { params: { indexes } })
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            alert("Чёт пошло по бороде c файлами");
          });
      }
    } catch (_) {
      alert(
        "Не все инпуты заполнены, а если и все, то дополнительные данные тоже должны быть!"
      );
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const client = await rootWayoutAPI();
    await client.delete(articleApiUrl).catch(() => {
      alert("Чет даные не удаляются(");
    });
    await client
      .delete(articleApiFileUrl)
      .then(() => {
        router.push("/admin/journal/");
      })
      .catch(() => {
        alert("Чет даные не удаляются(");
      });
  };

  const fetcher = async () => {
    const client = await rootWayoutAPI();
    let response = await client.get(articleApiUrl);

    response.data.value.blocks = JSON.parse(response.data.value.blocks);
    return response.data.value;
  };

  const { data, error } = useSWR(articleApiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Редактирование статьи №{id}</h2>
      <AdminUDForm
        requiredData={[
          { placeholder: "Название", name: "title", value: data.title },
          { placeholder: "Имя автора", name: "author", value: data.author },
          {
            placeholder: "Дата публикации",
            name: "created_at",
            type: "date",
            value: data.created_at,
          },
          {
            placeholder: "Время прочтения",
            name: "time_to_read",
            type: "number",
            value: data.time_to_read,
          },
          { placeholder: "Ссылка (транслит)", name: "slug", value: data.slug },
          {
            placeholder: "Текст 0 (Вступление)",
            name: "introduction",
            type: "text",
            value: data.introduction,
          },
        ]}
        optionalData={[
          {
            inputs: data.blocks.map(({ video_caption, subtitle, text }, i) => {
              return [
                {
                  type: "file",
                  placeholder: `Добавить фото/видео ${i}`,
                  name: `file_${i}`,
                },
                {
                  type: "text",
                  placeholder: `Подпись к фото/видео ${i}`,
                  name: `video_caption__${i}`,
                  value: video_caption,
                },
                {
                  type: "text",
                  placeholder: `Подзаголовок ${i}`,
                  name: `subtitle_${i}`,
                  value: subtitle,
                },
                {
                  type: "text",
                  placeholder: `Текст ${i}`,
                  name: `text_${i}`,
                  value: text,
                },
              ];
            }),
            title: "Блоки",
            sampleIndex: 0,
          },
        ]}
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
        handleSend={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default UDArticle;
