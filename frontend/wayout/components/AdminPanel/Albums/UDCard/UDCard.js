import styles from "../../AdminPanel.module.scss";
import wayoutAPI, { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";
import AdminUDForm from "@/components/UI/AdminUDForm";
import { useRouter } from "next/router";
const AlbumsUDCard = ({ id }) => {
  const albumsApiUrl = `/albums/${id}/`;
  const albumsApiFileUrl = `/files${albumsApiUrl}`;
  const router = useRouter();

  const handleUpdate = async (e, newSeparation) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[0].elements],
      formElements: document.forms[0].elements,
      price_include: [],
      model_description: [],
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

    form.formElementsArray.map((el) => {
      if (el.name === "price_include") {
        form.price_include.push(el.value);
      }
      if (el.name === "additional_description") {
        form.model_description.push(el.value);
      }
    });

    let newData = {
      title: form.formElements["title"].value,
      description: form.formElements["description"].value,
      new_price: form.formElements["new_price"].value,
      old_price: form.formElements["old_price"].value,
      sale_text: form.formElements["sale_text"].value,
      slug: form.formElements["slug"].value,
      price_include: JSON.stringify(form.price_include),
      model_description: JSON.stringify(form.model_description),
      separation: newSeparation,
    };
    const client = await rootWayoutAPI();

    await client.put(albumsApiUrl, newData).catch((e) => {
      console.log(e);
      alert("Какая-то херня с данными");
    });
    let separation = data.separation === newSeparation ? 0 : newSeparation - 1;
    if (indexes)
      await client
        .put(albumsApiFileUrl, form.formData, {
          params: { indexes, separation },
        })
        .then((_) => {
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
          alert("Какая-то херня с файлами");
        });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const client = await rootWayoutAPI();
    await client.delete(albumsApiUrl).catch((_) => {
      alert("Чет даные не удаляются(");
    });
    await client
      .delete(albumsApiFileUrl)
      .then(() => {
        router.push("/admin/albums/");
      })
      .catch((e) => {
        console.log(e);
        alert("Чет даные не удаляются(");
      });
  };

  const fetcher = async () => {
    let response = await wayoutAPI.get(albumsApiUrl);
    response.data.model_description = JSON.parse(
      response.data.model_description
    );
    response.data.price_include = JSON.parse(response.data.price_include);
    return response.data;
  };

  const { data, error } = useSWR(albumsApiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const requiredData = [
    { placeholder: "Название", name: "title", value: data.title },
    {
      placeholder: "Описание модели",
      name: "description",
      value: data.description,
    },
    {
      placeholder: "Цена акутальная",
      name: "new_price",
      type: "number",
      value: data.new_price,
    },
    {
      placeholder: "Цена старая",
      name: "old_price",
      type: "number",
      value: data.old_price,
    },
    {
      placeholder: "Текст про скидку",
      name: "sale_text",
      value: data.sale_text,
    },
    {
      placeholder: "Ссылка (транслит)",
      name: "slug",
      value: data.slug,
    },
    {
      placeholder: "Главное фото (Превью)",
      name: "0_file",
      type: "file",
    },
    {
      placeholder: "Обложка 0",
      name: "1_file",
      type: "file",
    },
    {
      placeholder: "Фото 1",
      name: "2_file",
      type: "file",
    },
    {
      placeholder: "Видеофайл",
      name: "3_file",
      type: "file",
    },
  ];

  const optionalData = [
    {
      inputs: [...Array(data.separation - 4).keys()].map((i) => {
        return [
          {
            type: "file",
            placeholder: `Обложка ${i}*`,
            name: "file",
          },
        ];
      }),
      title: "Обложки",
      sampleIndex: 0,
    },
    {
      inputs: [
        ...Array(
          data.files_quantity - data.separation > 0
            ? data.files_quantity - data.separation
            : 0
        ).keys(),
      ].map((i) => {
        return [
          {
            type: "file",
            placeholder: `Фото ${i}*`,
            name: "file",
          },
        ];
      }),
      title: "Фото",
      sampleIndex: 1,
    },
    {
      inputs: data.model_description.map((value, index) => {
        return [
          {
            placeholder: `Описание ${index}*`,
            name: "additional_description",
            value: value,
          },
        ];
      }),
      title: "Описание",
      sampleIndex: 2,
    },
    {
      inputs: data.price_include.map((value, index) => {
        return [
          {
            placeholder: `В стоимость входит ${index}*`,
            name: "price_include",
            value: value,
          },
        ];
      }),
      title: "В стоимость входит",
      sampleIndex: 3,
    },
  ];

  const getBlock = (i, sampleIndex) => {
    return [
      [
        {
          type: "file",
          placeholder: `Обложка ${i}*`,
          name: "file",
        },
      ],
      [
        {
          type: "file",
          placeholder: `Фото ${i}*`,
          name: "file",
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
  };

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Редактирование карточки №{id}</h2>
      <AdminUDForm
        required_data={requiredData}
        optional_data={optionalData}
        blockSample={getBlock}
        handleSend={handleUpdate}
        handleDelete={handleDelete}
        defaultSeparation={data.separation}
        deleteFileAPIUrl={albumsApiFileUrl}
      />
    </div>
  );
};
export default AlbumsUDCard;
