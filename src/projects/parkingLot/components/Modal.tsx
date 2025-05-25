import React from "react";

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: JSX.Element;
  showFooter?: boolean;
  onSave?: () => void;
  saveButtonName?: string;
  isLoading?: boolean;
}

const Modal = ({
  show,
  children,
  showFooter = true,
  title,
  onClose,
  onSave = () => {},
  saveButtonName = "Save",
  isLoading = false,
}: ModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.className.includes("modal show d-block z-3")) {
      onClose();
    }
  };
  return show ? (
    <div className="custom-modal">
      {/* <div className="custom-overlay" onClick={onClose}></div> */}
      <div
        className={`modal show d-block z-3 bg-opacity-50 bg-dark`}
        tabIndex={-1}
        onClick={handleOutsideClick}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {title && <h5 className="modal-title">{title}</h5>}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              {children}
            </div>
            {showFooter && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : saveButtonName}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
