import styles from "../../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import AdminUDForm from "@/components/UI/AdminUDForm";
import { useRouter } from "next/router";
import useSWR from "swr";
import { blockSample, requestData, requiredData } from "../articleUtils";

const UDArticle = ({ id }) => {
  const router = useRouter();

  const articleApiUrl = `/posts/articles/${id}/`;
  const articleApiFileUrl = `/files/articles/${id}/`;

  const handleUpdate = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[1].elements],
      formElements: document.forms[1].elements,
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

      if (
        !Object.values(requestData(form, blocksArray)).every((item) => item)
      ) {
        throw "Not all values exists";
      }

      const client = await rootWayoutAPI();
      await client
        .put(articleApiUrl, requestData(form, blocksArray))
        .catch(() => {
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

  const requiredUpdateData = requiredData.map((el) => {
    if (el.type !== "file") el.value = data[el.name];
    return el;
  });

  const optionalData = [
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
            name: `video_caption_${i}`,
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
  ];

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Редактирование статьи №{id}</h2>
      <AdminUDForm
        requiredData={requiredUpdateData}
        optionalData={optionalData}
        blockSample={blockSample}
        handleSend={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default UDArticle;
