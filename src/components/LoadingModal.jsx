import React from "react";
import Modal from "react-modal";
import { LineWave } from "react-loader-spinner";

const LoadingModal = ({ isSubmitting }) => {
  return (
    <Modal
      isOpen={isSubmitting}
      contentLabel="Loading"
      className="login-modal"
      overlayClassName="login-modal-overlay"
      ariaHideApp={false}
    >
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#2c3e50"
        ariaLabel="line-wave-loading"
      />
    </Modal>
  );
};

export default React.memo(LoadingModal);
