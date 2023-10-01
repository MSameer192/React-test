import { useDispatch } from "react-redux";
import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import { toast } from "react-toastify";
import { deleteCustomer } from "../../customers/customerSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, id } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_DELETE) {
      // Dispatch the action to delete the customer
      dispatch(deleteCustomer(id));
      // dispatch(showNotification({message : "Lead Deleted!", status : 1}))
      toast.success("Customer Deleted!");
    }

    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 px-8 text-center">{message}</p>

      <div className="modal-action mt-12 flex justify-center">
        <button
          className="btn border-0 bg-[#A5A5AF] hover:bg-[#292727] w-36"
          onClick={() => closeModal()}
        >
          Cancel
        </button>

        <button
          className="btn bg-[#D80000] hover:bg-[#d80000c4] border-0 w-36"
          onClick={() => proceedWithYes()}
        >
          delete
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
