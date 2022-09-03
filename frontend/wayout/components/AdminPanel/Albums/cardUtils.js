export const requestData = (form) => {
  return {
    title: form.formElements["title"].value,
    description: form.formElements["description"].value,
    new_price: form.formElements["new_price"].value,
    old_price: form.formElements["old_price"].value,
    sale_text: form.formElements["sale_text"].value,
    slug: form.formElements["slug"].value,
    price_include: JSON.stringify(form.price_include),
    model_description: JSON.stringify(form.model_description),
  };
};

export const blockSample = (i, sampleIndex) => {
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

export const requiredData = [
  { placeholder: "Название", name: "title" },
  { placeholder: "Описание модели", name: "description" },
  { placeholder: "Цена актуальная", name: "new_price", type: "number" },
  { placeholder: "Цена старая", name: "old_price", type: "number" },
  { placeholder: "Текст про скидку", name: "sale_text" },
  { placeholder: "Ссылка (транслит)", name: "slug" },
  {
    placeholder: "Главное фото (Превью)",
    name: "file",
    type: "file",
  },
  { placeholder: "Обложка 0", name: "file", type: "file" },
  { placeholder: "Фото 1", name: "file", type: "file" },
  { placeholder: "Видеофайл", name: "file", type: "file" },
];
