export const convertImageToWebp = (file: File): Promise<File> =>
  new Promise((resolve, reject) => {
    const rawImage = new Image();
    rawImage.addEventListener("load", () => {
      resolve(rawImage);
    });
    rawImage.src = URL.createObjectURL(file);
  }).then(
    (rawImage: any) =>
      new Promise((resolve, reject) => {
        const canvas: any = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = rawImage.width;
        canvas.height = rawImage.height;
        ctx.drawImage(rawImage, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                new File(
                  [blob],
                  `${new Date().getTime()}_${file.name.substring(
                    0,
                    file.name.lastIndexOf("."),
                  )}.webp`,
                  { type: blob.type },
                ),
              );
            } else {
              reject(
                new Error(
                  "Фотографія перевищуює максимальний розмір. Будь ласка, завантажте зображення меньшого розміру",
                ),
              );
            }
          },
          "image/webp",
          0.99,
        );
      }),
  );
