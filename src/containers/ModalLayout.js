import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import CustomerModalBody from "../features/customers/components/CustomerModalBody";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}
      <div
        className={`modal ${
          isOpen ? "modal-open bg-gray-800 bg-opacity-75 " : ""
        }`}
      >
        <div
          className={`modal-box  ${
            size === "lg" ? "max-w-5xl" : ""
          } bg-model-pattern bg-no-repeat bg-contain`}
        >
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>

          <h3 className="font-semibold font-recoleta text-3xl mt-8 text-white text-center">
            {title}
          </h3>
          {/* Loading modal body according to different modal type */}

          <div className="mt-24">
            {
              {
                [MODAL_BODY_TYPES.CUSTOMER_ADD_EDIT]: (
                  <CustomerModalBody
                    closeModal={close}
                    extraObject={extraObject}
                  />
                ),

                [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
              }[bodyType]
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
