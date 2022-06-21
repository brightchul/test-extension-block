import axios from "axios";

const API_HOST = "https://blocking-extension-test-back.herokuapp.com";

export async function getAll() {
  return axios.get(`${API_HOST}/extension/all`).then((res) => res.data);
}

export async function addCustomExtensionAPI(extensionName: string) {
  return axios
    .post(`${API_HOST}/extension/custom/${extensionName}`)
    .then((res) => res.data);
}

export async function deleteCustomExtensionAPI(extensionName: string) {
  return axios
    .delete(`${API_HOST}/extension/custom/${extensionName}`)
    .then((res) => res.data);
}

export async function addFixedExtensionAPI(extensionName: string) {
  return axios
    .post(`${API_HOST}/extension/fixed/${extensionName}`)
    .then((res) => res.data);
}

export async function deleteFixedExtensionAPI(extensionName: string) {
  return axios
    .delete(`${API_HOST}/extension/fixed/${extensionName}`)
    .then((res) => res.data);
}
