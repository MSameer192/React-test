import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, openDltModal } from "../common/modalSlice";
import { getCustomersContent } from "./customerSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import BasicTable from "../../components/Table/BasicTable";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCustomerModal = () => {
    dispatch(
      openModal({
        title: "Add New Customer",
        bodyType: MODAL_BODY_TYPES.CUSTOMER_ADD_EDIT,
        extraObject: {},
      })
    );
  };

  return (
    <div className="mt-5">
      <button
        className="p-3 text-white rounded-xl font-medium text-lg border-0 bg-gradient-to-r from-[#57BC90] to-[#015249]"
        onClick={() => openAddNewCustomerModal()}
      >
        <span className="text-[25px] me-5">+</span> ADD NEW CUSTOMER
      </button>
    </div>
  );
};

function Customers() {
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    const customersData = JSON.parse(localStorage.getItem("customersData"));
    if (!customersData) {
      dispatch(getCustomersContent());
    }
  }, [dispatch]);

  console.log("customers", customers);

  const deleteCurrentCustomer = (index, id) => {
    // Dispatch any additional actions or open a confirmation modal as needed
    dispatch(
      openDltModal({
        title: "Are you sure?",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Do you really want to delete this customer? This process cannot be undone.`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_DELETE,
          id,
        },
      })
    );
  };
  const editCurrentCustomer = async (index, id) => {
    dispatch(
      openModal({
        title: "Edit Customer",
        bodyType: MODAL_BODY_TYPES.CUSTOMER_ADD_EDIT,
        extraObject: { index, id, customer: customers[index] },
      })
    );
  };
  
  const categoryColum = [
    {
      header: "",
      accessorKey: "",
      id: "avatar",
      cell: ({ row }) => (
        <>
          <div className="avatar">
            <div className="w-20 rounded-xl">
              <img src={row?.original?.avatar} alt="" />
            </div>
          </div>
        </>
      ),
    },
    {
      header: "Customer Id",
      accessorKey: "id",
    },
    {
      header: "Customer Name", // New column header
      accessorKey: "first_name", // Use a custom accessor key
      cell: ({ row }) => (
        <>
          {row.original.first_name} {row.original.last_name}
        </>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "",
      accessorKey: "",
      id: "actions",
      cell: ({ row }) => (
        <>
          <button
            className=" py-1 px-8  rounded-lg text-[#008212] bg-[#39B54A] bg-opacity-40 hover:bg-opacity-60 text-sm	"
            onClick={() => editCurrentCustomer(row.index, row.original.id)}
          >
            Edit
          </button>

          <span className="text-white">...</span>
          <button
            className="py-1 px-6 ms-5 rounded-lg text-[#D80000] bg-[#D80000] bg-opacity-40 hover:bg-opacity-60 text-sm"
            onClick={() => deleteCurrentCustomer(row.index, row.original.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <TopSideButtons />
      {/* <TitleCard topMargin="mt-10"></TitleCard> */}
      <BasicTable data={customers} columns={categoryColum} />
    </>
  );
}

export default Customers;
