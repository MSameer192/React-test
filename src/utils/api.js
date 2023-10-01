// api.js
import instance from "./axios-config";

export const fetchCustomers = async () => {
  try {
    const response = await instance.get("/users?page=1");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
