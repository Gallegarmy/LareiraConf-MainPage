import { useEffect, useRef, useState } from "react";
import "./Modal.scss";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  triggerText: string;
}

export default function Modal({
  id,
  title,
  children,
  triggerText,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setIsOpen(false);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, []);

  return (
    <>
      <button className="modal-trigger" onClick={openModal}>
        {triggerText}
      </button>

      <dialog ref={dialogRef} id={id} className="modal">
        <div className="modal__content">
          <header className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button
              className="modal__close"
              onClick={closeModal}
              aria-label="Cerrar"
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </header>
          <div className="modal__body">{children}</div>
        </div>
      </dialog>
    </>
  );
}
