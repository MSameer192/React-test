import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import DeletedCustomer from "../../features/deletedCustomers";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Deleted Customers" }));
    // eslint-disable-next-line
  }, []);

  return <DeletedCustomer />;
}

export default InternalPage;
