import React from 'react';
import Modal from 'react-modal';
import BeatLoader from 'react-spinners/BeatLoader';

const LoadingModal = ({ isSubmitting }) => {
  return (
    <Modal
      isOpen={isSubmitting}
      contentLabel="Loading"
      className="login-modal"
      overlayClassName="login-modal-overlay"
      ariaHideApp={false}
    >
      <BeatLoader color="#36d7b7" size={15} />
    </Modal>
  );
};

export default React.memo(LoadingModal);
