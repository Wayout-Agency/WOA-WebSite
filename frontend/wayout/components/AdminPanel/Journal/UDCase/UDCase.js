import styles from "../../AdminPanel.module.scss";
import wayoutAPI, { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";
import AdminUDForm from "@/components/UI/AdminUDForm";
import { useRouter } from "next/router";
import { blockSample, requestData, requiredData } from "../caseUtils";

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

    const client = await rootWayoutAPI();

    await client.put(casesApiUrl, requestData(form)).catch(() => {
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

  const requiredUpdateData = requiredData.map((el) => {
    if (el.type !== "file") el.value = data[el.name];
    return el;
  });

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

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={styles.title}>Редактирование кейса №{id}</h2>
      <AdminUDForm
        requiredData={requiredUpdateData}
        optionalData={optionalData}
        blockSample={blockSample}
        handleSend={handleUpdate}
        handleDelete={handleDelete}
        deleteFileAPIUrl={casesApiFileUrl}
      />
    </div>
  );
};
export default UDCase;
