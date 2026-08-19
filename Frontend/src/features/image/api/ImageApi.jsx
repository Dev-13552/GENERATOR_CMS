
export const generateImageAPI = async (data) => {
    return await api.post("v1/image/generate", data);
}

export const getImageHistoryAPI = async () => {
    return await api.get("/v1/image/history");
}