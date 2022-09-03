export const requestData = (form) => {
  return {
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
};

export const blockSample = (i, sampleIndex) => {
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

export const requiredData = [
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
    name: "file",
    type: "file",
  },
  { placeholder: "Задача", name: "task" },
  { placeholder: "Фото 2", name: "file", type: "file" },
  { placeholder: "Фото вертикальное 1", name: "file", type: "file" },
  {
    placeholder: "Фото вертикальное 2",
    name: "file",
    type: "file",
  },
  { placeholder: "Фото 3 Превью", name: "file", type: "file" },
  { placeholder: "Процесс", name: "process" },
  { placeholder: "Фото 4", name: "file", type: "file" },
];
