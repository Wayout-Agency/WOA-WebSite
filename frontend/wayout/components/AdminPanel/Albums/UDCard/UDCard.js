import styles from "../../AdminPanel.module.scss";
import wayoutAPI, { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";
import AdminUDForm from "@/components/UI/AdminUDForm";
import { useRouter } from "next/router";
import { blockSample, requiredData, requestData } from "../cardUtils";

const AlbumsUDCard = ({ id }) => {
  const albumsApiUrl = `/albums/${id}/`;
  const albumsApiFileUrl = `/files${albumsApiUrl}`;
  const router = useRouter();

  const handleUpdate = async (e, newSeparation) => {
    e.preventDefault();

    let form = {
      formElementsArray: [...document.forms[1].elements],
      formElements: document.forms[1].elements,
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

    let newData = requestData(form);
    newData.separation = newSeparation;

    const client = await rootWayoutAPI();

    await client.put(albumsApiUrl, newData).catch(() => {
      alert("Какая-то херня с данными");
    });
    let separation = data.separation === newSeparation ? 0 : newSeparation - 1;
    if (indexes)
      await client
        .put(albumsApiFileUrl, form.formData, {
          params: { indexes, separation },
        })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          alert("Какая-то херня с файлами");
        });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const client = await rootWayoutAPI();
    await client.delete(albumsApiUrl).catch(() => {
      alert("Чет даные не удаляются(");
    });
    await client
      .delete(albumsApiFileUrl)
      .then(() => {
        router.push("/admin/albums/");
      })
      .catch(() => {
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

  const requiredUpdateData = requiredData.map((el) => {
    if (el.type !== "file") el.value = data[el.name];
    return el;
  });

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

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Редактирование карточки №{id}</h2>
      <AdminUDForm
        requiredData={requiredUpdateData}
        optionalData={optionalData}
        blockSample={blockSample}
        handleSend={handleUpdate}
        handleDelete={handleDelete}
        defaultSeparation={data.separation}
        deleteFileAPIUrl={albumsApiFileUrl}
      />
    </div>
  );
};
export default AlbumsUDCard;
