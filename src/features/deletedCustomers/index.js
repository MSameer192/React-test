import BasicTable from "../../components/Table/BasicTable";

function DeletedCustomers() {
  const deletedCustomers =
    JSON.parse(localStorage.getItem("deletedUsers")) || [];

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
  ];

  return (
    <>
      <BasicTable data={deletedCustomers} columns={categoryColum} />
    </>
  );
}

export default DeletedCustomers;
