import { Injectable } from '@angular/core';

// @dynamic
@Injectable()
export class FileUtils {

    public static parseFileSize(bytes, decimals = 2): string {
        if (bytes === 0) return '0';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    public static getFileExtension(value: File): string {
        if (!value)
            return '';

        if (value.name.indexOf('.') === -1) {
            return '';
        }

        return value.name.split('.').pop();
    }

    public static readAsDataURL(file: File, onLoad: (result: string | ArrayBuffer) => void): void {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => onLoad(reader.result);
            reader.readAsDataURL(file);
        }
    }

    public static isImage(file: File): boolean {
        return (/\.(gif|jpe?g|jpg|tiff|png|webp|bmp)$/i).test(file.name);
    }
}