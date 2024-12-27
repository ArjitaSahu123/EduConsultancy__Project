import React from 'react';

const Confirmationmodel = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="text-lg mb-4">{message}</div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md btn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-[#DB172C] text-[white] rounded-md hover:bg-red-600 btn"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmationmodel;
