export function getHugeFile(name: string, size: number): File {
    const file = new File([''], name);
    Object.defineProperty(
        file, 'size', { value: size, writable: false });
    return file;
}