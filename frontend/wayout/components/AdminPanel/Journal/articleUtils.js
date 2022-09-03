export const requestData = (form, blocksArray) => {
  return {
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
};

export const blockSample = (i, sampleIndex) => {
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
        name: `video_caption_${i}`,
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
};

export const requiredData = [
  { placeholder: "Название", name: "title" },
  { placeholder: "Имя автора", name: "author" },
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
    placeholder: "Текст 0 (Вступление)",
    name: "introduction",
    type: "text",
  },
];
