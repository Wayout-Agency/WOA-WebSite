import styles from "./AlbumsUDCard.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import wayoutAPI, { rootWayoutAPI } from "services/wayoutApi";
import AdminForm from "@/components/UI/AdminForm";
import useSWR from "swr";
import { useState } from "react";
const AlbumsUDCard = ({ id }) => {
  const albumsApiUrl = `/albums/${id}/`;
  const [curentData, setCurentData] = useState({});
  const [indexes, setIndexes] = useState("");
  const [files, setFile] = useState([]);

  const globalOnChange = (e) => {
    let data = Object.assign({}, curentData);
    if (e.target.type === "file") {
      setFile([...files, e.target.files[0]]);
      if (isNaN(e.target.name.at(-1))) {
        setIndexes(indexes + e.target.name[0]);
        return;
      }
      let first = e.target.name[0];
      if (first == 1) {
        setIndexes(indexes + String(Number(e.target.name.at(-1)) + 4));
        data.separation += 1;
        setCurentData(data);
        return;
      }

      if (first == 2) {
        setIndexes(
          indexes + String(Number(e.target.name.at(-1)) + data.separation)
        );
        return;
      }
    }// Fix this !
    if (e.target.name[0] == "p") {
      let index = Number(e.target.name.at(-1));
      data.price_include[index] = e.target.value;
      console.log(data);
      setCurentData(data);
      return;
    }// Fix this !
    console.log(e.target.name[0]);
    if (e.target.name[0] == "m") {
      let index = Number(e.target.name.at(-1));
      data.model_description[index] = e.target.value;
      setCurentData(data);
      return;
    }
    data[e.target.name] = e.target.value;
    setCurentData(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    files.map((file) => {
      formData.append("files", file);
    });
    const client = await rootWayoutAPI();
    curentData.model_description = JSON.stringify(curentData.model_description);
    curentData.price_include = JSON.stringify(curentData.price_include);
    // let response = await client.put(albumsApiUrl, curentData);
    // console.log(response);
    if (files) console.log("adadad");
    console.log(indexes, curentData, files);
  };

  const fetcher = async () => {
    let response = await wayoutAPI.get(albumsApiUrl);
    response.data.model_description = JSON.parse(
      response.data.model_description
    );
    response.data.price_include = JSON.parse(response.data.price_include);
    setCurentData(response.data);
    return response.data;
  };
  const { data, error } = useSWR(albumsApiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Редактирование карточки №{id}</h2>
      <AdminForm
        required_data={[
          { placeholder: "Название", name: "title", value: curentData.title },
          {
            placeholder: "Описание модели",
            name: "description",
            value: curentData.description,
          },
          {
            placeholder: "Цена акутальная",
            name: "new_price",
            type: "number",
            value: curentData.new_price,
          },
          {
            placeholder: "Цена старая",
            name: "old_price",
            type: "number",
            value: curentData.old_price,
          },
          {
            placeholder: "Текст про скидку",
            name: "sale_text",
            value: curentData.sale_text,
          },
          {
            placeholder: "Ссылка (транслит)",
            name: "slug",
            value: curentData.slug,
          },
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
          {
            inputs: [...Array(curentData.separation - 4).keys()].map((i) => {
              return [
                {
                  type: "file",
                  placeholder: `Обложка ${i}*`,
                  name: `1_file_${i}`,
                },
              ];
            }),
            title: "Обложки",
            sampleIndex: 0,
          },
          {
            inputs: [
              ...Array(
                curentData.files_quantity - curentData.separation
              ).keys(),
            ].map((i) => {
              return [
                {
                  type: "file",
                  placeholder: `Фото ${i}*`,
                  name: `2_file_${i}`,
                },
              ];
            }),
            title: "Фото",
            sampleIndex: 1,
          },
          {
            inputs: curentData.model_description.map((value, index) => {
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
          },
          {
            inputs: curentData.price_include.map((value, index) => {
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
          },
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
        handleSend={handleUpdate}
        handleDelete={() => {}}
        globalOnChange={globalOnChange}
      />
    </div>
  );
};
export default AlbumsUDCard;
