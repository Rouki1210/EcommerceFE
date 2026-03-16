import baseUrl from "./config";

export const getProducts = () =>
    baseUrl.get("/api/products").then((res) => res.data);

export const getProductById = (id) =>
    baseUrl.get(`/api/products/${id}`).then((res) => res.data);

export const createProduct = (data) =>
    baseUrl.post("/api/products", data).then((res) => res.data);

export const updateProduct = (id, data) =>
    baseUrl.put(`/api/products/${id}`, data).then((res) => res.data);

export const deleteProduct = (id) =>
    baseUrl.delete(`/api/products/${id}`).then((res) => res.data);

export const uploadProductImage = async (productId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await baseUrl.post(`/api/products/${productId}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
