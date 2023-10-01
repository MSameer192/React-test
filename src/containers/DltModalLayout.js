import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeDltModal } from "../features/common/modalSlice";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import dltIcon from "../images/icons/dlticon1.png";

function DltModalLayout() {
  const { isOpenDltModal, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeDltModal(e));
  };

  return (
    <>
      {/* The button to open modal */}
      <div
        className={`modal ${
          isOpenDltModal ? "modal-open bg-gray-800 bg-opacity-75 " : ""
        }`}
      >
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>

          <div>
            <img src={dltIcon} alt="dlt-icon" className="mx-auto mb-6" />
          </div>
          <h3 className="font-semibold font-recoleta text-2xl text-center">
            {title}
          </h3>
          {/* Loading modal body according to different modal type */}

          <div className="mt-2">
            {
              {
                [MODAL_BODY_TYPES.CONFIRMATION]: (
                  <ConfirmationModalBody
                    extraObject={extraObject}
                    closeModal={close}
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

export default DltModalLayout;
