import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = `/products`;
    return axiosClient.get(url);
  },

  delete: (query) => {
    const url = `/products/delete/${query}`;
    return axiosClient.delete(url);
  },

  getDetail: (id) => {
    const url = `products/detail/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products${query}`;
    return axiosClient.get(url);
  },
  update: (query) => {
    const url = "/products/update";
    return axiosClient.patch(url, query);
  },
  postNewProduct: (query) => {
    const url = "/products/newproduct";
    return axiosClient.post(url, query);
  },
};

export default ProductAPI;
