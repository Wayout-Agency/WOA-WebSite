import styles from "./AlbumsUDCard.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import wayoutAPI, { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";
import { useState } from "react";
import AdminUDForm from "@/components/UI/AdminUDForm";
const AlbumsUDCard = ({ id }) => {
  const albumsApiUrl = `/albums/${id}/`;
  const [indexes, setIndexes] = useState("");

  const handleUpdate = async (e, data, indexes, files) => {
    e.preventDefault();
    console.log(indexes, data, files);
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
  // Fix this!
  let preIndex = 0;
  requiredData.map(({ type }) => {
    if (type === "file") preIndex += 1;
  });

  const optionalData = [
    {
      inputs: [...Array(data.separation - preIndex).keys()].map((i) => {
        return [
          {
            type: "file",
            placeholder: `Обложка ${i}*`,
            name: `${i + preIndex}_file`,
          },
        ];
      }),
      title: "Обложки",
      sampleIndex: 0,
      files: true,
    },
    {
      inputs: [...Array(data.files_quantity - data.separation).keys()].map(
        (i) => {
          return [
            {
              type: "file",
              placeholder: `Фото ${i}*`,
              name: `${i + preIndex}_file`,
            },
          ];
        }
      ),
      title: "Фото",
      sampleIndex: 1,
      files: true,
    },
    {
      inputs: data.model_description.map((value, index) => {
        return [
          {
            placeholder: `Описание ${index}*`,
            name: `model_description_${index}`,
            value: value,
          },
        ];
      }),
      title: "Описание",
      sampleIndex: 2,
      files: false,
    },
    {
      inputs: data.price_include.map((value, index) => {
        return [
          {
            placeholder: `В стоимость входит ${index}*`,
            name: `price_include_${index}`,
            value: value,
          },
        ];
      }),
      title: "В стоимость входит",
      sampleIndex: 3,
      files: false,
    },
  ];

  const getBlock = (i, sampleIndex) => {
    return [
      [
        {
          type: "file",
          placeholder: `Обложка ${i}*`,
          name: `${i + preIndex}_file`,
        },
      ],
      [
        {
          type: "file",
          placeholder: `Фото ${i}*`,
          name: `${i + preIndex}_file`,
        },
      ],
      [
        {
          placeholder: `Описание ${i}*`,
          name: `model_description_${i}`,
        },
      ],
      [
        {
          placeholder: `В стоимость входит ${i}*`,
          name: `price_include_${i}`,
        },
      ],
    ][sampleIndex];
  };

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Редактирование карточки №{id}</h2>
      <AdminUDForm
        required_data={requiredData}
        optional_data={optionalData}
        blockSample={getBlock}
        handleSend={handleUpdate}
        handleDelete={() => {}}
        indexes={indexes}
        setIndexes={setIndexes}
      />
    </div>
  );
};
export default AlbumsUDCard;
