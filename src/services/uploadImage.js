const IMGBB_API_KEY = "57b710fc5040dbe5d45f374b53fd682d" //key para subir imágenes a IMGBB
const ENDPOINT = "http://api.imgbb.com/1/upload"

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`${ENDPOINT}?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error("Error al subir la imagen");
    }

    return data.data.url;
    }catch (error) {
        console.error("ImgBB error:", error);
        throw error;
    }
};