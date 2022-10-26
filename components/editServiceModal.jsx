import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ServiceEdition from './editService';
import styles from '../styles/components/modal.module.scss';

function EditServiceModal({ show, setShowModal, id }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = e => {
    e.preventDefault();
    setShowModal(false);
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <button
          type='button'
          className={styles.close__modal}
          onClick={handleCloseClick}
        >
          <strong>X</strong>
        </button>

        <StyledModalBody>
          <ServiceEdition setShowModal={setShowModal} id={id} />
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  }
  return null;
}

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: auto;
  min-height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

EditServiceModal.propTypes = {
  show: PropTypes.bool,
  setShowModal: PropTypes.func,
  id: PropTypes.string,
};
EditServiceModal.defaultProps = {
  show: false,
  id: '',
  setShowModal: () => null,
};

export default EditServiceModal;
