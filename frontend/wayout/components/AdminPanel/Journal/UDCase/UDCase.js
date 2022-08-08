import styles from "../../AdminPanel.module.scss";
import wayoutAPI, { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";
import AdminUDForm from "@/components/UI/AdminUDForm";
import { useRouter } from "next/router";

const UDCase = ({ id }) => {
  const casesApiUrl = `/posts/cases/${id}/`;
  const casesApiFileUrl = `/files/cases/${id}/`;
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[0].elements],
      formElements: document.forms[0].elements,
      formData: new FormData(),
    };

    let indexes = "";

    [...form.formElementsArray.filter((input) => input.type === "file")].map(
      (el, index) => {
        if (el.files[0]) {
          form.formData.append("files", el.files[0]);
          indexes = indexes + String(index);
        }
      }
    );

    let newData = {
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
    const client = await rootWayoutAPI();

    await client.put(casesApiUrl, newData).catch(() => {
      alert("Какая-то херня с данными");
    });
    if (indexes)
      await client
        .put(casesApiFileUrl, form.formData, {
          params: { indexes },
        })
        .then(() => window.location.reload())
        .catch(() => {
          alert("Какая-то херня с файлами");
        });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const client = await rootWayoutAPI();
    await client.delete(casesApiUrl).catch(() => {
      alert("Чет даные не удаляются(");
    });
    await client
      .delete(casesApiFileUrl)
      .then(() => {
        router.push("/admin/journal/");
      })
      .catch(() => {
        alert("Чет даные не удаляются(");
      });
  };

  const fetcher = async () => {
    let response = await wayoutAPI.get(casesApiUrl);
    return response.data.value;
  };

  const { data, error } = useSWR(casesApiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const requiredData = [
    { placeholder: "Название", name: "title", value: data.title },
    {
      placeholder: "Описание проекта (серый текст)",
      name: "description",
      value: data.description,
    },
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
    {
      placeholder: "Ссылка (транслит)",
      name: "slug",
      value: data.slug,
    },
    {
      placeholder: "Главное фото (Превью и Большое при нажатии)",
      name: "file",
      type: "file",
    },
    { placeholder: "Задача", name: "task", value: data.task },
    { placeholder: "Фото 2", name: "file", type: "file" },
    { placeholder: "Фото вертикальное 1", name: "file", type: "file" },
    {
      placeholder: "Фото вертикальное 2",
      name: "file",
      type: "file",
    },
    { placeholder: "Фото 3 Превью", name: "file", type: "file" },
    { placeholder: "Процесс", name: "process", value: data.process },
    { placeholder: "Фото 4", name: "file", type: "file" },
  ];
  const optionalData = [
    {
      inputs: [...Array(data.files_quantity - 6).keys()].map((i) => {
        return [
          {
            type: "file",
            placeholder: `Слайд ${i}*`,
            name: "file",
          },
        ];
      }),
      title: "Фото 3",
      sampleIndex: 0,
    },
  ];

  const getBlock = (i, sampleIndex) => {
    return [
      [
        {
          type: "file",
          placeholder: `Слайд ${i}*`,
          name: "file",
        },
      ],
    ][sampleIndex];
  };
  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Редактирование кейса №{id}</h2>
      <AdminUDForm
        requiredData={requiredData}
        optionalData={optionalData}
        blockSample={getBlock}
        handleSend={handleUpdate}
        handleDelete={handleDelete}
        deleteFileAPIUrl={casesApiFileUrl}
      />
    </div>
  );
};
export default UDCase;
