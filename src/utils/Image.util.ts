import { APP_CONFIG } from "../../../../config/app.server.config";

export class ImageUtil
{
    static base64ToFile = (data: string, filename: string): File => {

        const arr = data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    };

    static fileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    static convertImageToWebp = (file: File): Promise<File> => new Promise((resolve, reject) => {
        const rawImage = new Image();
        rawImage.addEventListener('load', () => {
            resolve(rawImage);
        });
        rawImage.src = URL.createObjectURL(file);
    }).then((rawImage: HTMLImageElement) => new Promise((resolve, reject) => {
        const canvas: any = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = rawImage.width;
        canvas.height = rawImage.height;
        ctx.drawImage(rawImage, 0, 0);
        canvas.toBlob((blob) => {
            resolve(new File([blob], file.name.substr(0, file.name.lastIndexOf('.')) + '.webp', {type: blob.type}));
        }, 'image/webp', 0.99);
    }));

    static whImageSrc = (name: string): string => APP_CONFIG.MEDIA_SERVER + name;

}
