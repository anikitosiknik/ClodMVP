const reader = new FileReader();

export const getStringFromImg = (file: File) : Promise<string> => {
    return new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result?.toString() || '');
        }
        reader.onerror = () => {
            reject()
        }
    })
} 