import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCustomers } from "../../utils/api";

export const getCustomersContent = createAsyncThunk(
  "/customers/content",
  async () => {
    const response = await fetchCustomers();
    localStorage.setItem("customersData", JSON.stringify(response));
    return response;
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    isLoading: false,
    customers: JSON.parse(localStorage.getItem("customersData")) || [],
  },
  reducers: {
    addNewCustomer: (state, action) => {
      state.customers.push(action.payload);

      // Update local storage with the updated customer list
      localStorage.setItem("customersData", JSON.stringify(state.customers));
    },

    deleteCustomer: (state, action) => {
      const idToDelete = action.payload;

      // Find the index of the customer to delete in the Redux state
      const customerIndex = state.customers.findIndex(
        (item) => item.id === idToDelete
      );

      if (customerIndex !== -1) {
        // Remove the customer from the Redux state
        const deletedCustomer = state.customers.splice(customerIndex, 1)[0];

        // Update local storage with the modified customer list
        localStorage.setItem("customersData", JSON.stringify(state.customers));

        // Retrieve the list of deleted users from local storage or initialize it as an empty array
        const deletedUsers =
          JSON.parse(localStorage.getItem("deletedUsers")) || [];

        // Add the deleted customer to the list of deleted users
        deletedUsers.push(deletedCustomer);

        // Update local storage with the modified list of deleted users
        localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));
      }
    },

    updateNewCustomer: (state, action) => {
      const { id, updatedData } = action.payload;
      const customerIndex = state.customers.findIndex((item) => item.id === id);
      // Create a new object for the updated customer
      const updatedCustomer = {
        ...state.customers[customerIndex],
        ...updatedData,
      };

      // Update the customer in the customers array
      state.customers[customerIndex] = updatedCustomer;

      // Update local storage with the modified data
      localStorage.setItem("customersData", JSON.stringify(state.customers));
    },
  },
  extraReducers: {
    [getCustomersContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomersContent.fulfilled]: (state, action) => {
      state.customers = action.payload;
      state.isLoading = false;
    },
    [getCustomersContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});


export const { addNewCustomer, deleteCustomer, updateNewCustomer } =
  customersSlice.actions;

export default customersSlice.reducer;
