import React from "react";
import type { ReactNode } from "react"; // ✅ type-only import

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <button
          onClick={onClose}
          className="mb-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
