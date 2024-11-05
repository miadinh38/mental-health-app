import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosWarning, IoIosCloseCircleOutline } from "react-icons/io";

const ConfirmationModal = ({ isModalOpen, onCloseModal, onConfirmModal }) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex flexCenter z-50"
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-lg p-8 w-94 flex flexCenter flex-col gap-3" /* Add styles */
          >
            <div className="absolute top-5 right-5">
              <IoIosCloseCircleOutline
                className="text-gray-30 cursor-pointer text-3xl rounded-full hover:text-black"
                onClick={onCloseModal}
              />
            </div>{" "}
            <IoIosWarning className="text-red-500 text-5xl mt-3" />
            <p className="regular-14">Are you sure you want to delete this content?</p>
            <button
              onClick={onConfirmModal}
              className="gap-3 mt-4 btn_white rounded-3xl"
            >
              Delete
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmationModal;
