//Modal.tsx
import useModalStore from "@/stores/modal";
import React from "react";

const Modal = () => {
  const { isOpen,  modal } = useModalStore()

  return  (
    <>
      <div className={`modal modal-bottom sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-slate-800">
          {modal ?? <></>}
        </div>
      </div>
    </>
  );
};

export default Modal;

