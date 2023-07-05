import axios from "axios";

const baseURL = "http://localhost:8080/inventory";
export const helpers = {
  getAllInventory: function () {
    return axios.get(baseURL);
  },

  addNewInventory: function (inventory) {
    return axios.post(baseURL, inventory);
  },

  updateInventory: function (inventory) {
    return axios.put(baseURL, inventory);
  },

  delteInventory: function (id) {
    return axios.delete(baseURL + "/" + id);
  },
};
