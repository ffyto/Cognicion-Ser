import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import styles from '../styles/components/userModal.module.scss';
import { getSingleAppointment } from '../services/appointments';

function UserModal({ show, setShowModal, appointmentId }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [appointment, setAppointment] = useState({});

  const { user } = appointment;

  const { pacient } = appointment;

  useEffect(() => {
    const getAppointment = async () => {
      const singleAppointment = await getSingleAppointment(appointmentId);
      setAppointment(singleAppointment);
    };
    if (appointmentId) {
      getAppointment();
    }
    setIsBrowser(true);
  }, [appointmentId]);

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
          {appointment.user ? (
            <div className={styles.card}>
              <h4>Información de Contacto</h4>
              <p>
                Usuario Solicitante: {user.name} {user.lastName}
              </p>
              <p>Teléfono: {user.phoneNumber} </p>
              <p>Email: {user.email} </p>
              <br />
              <h4>Datos del Paciente</h4>
              <p>
                Nombre: {pacient.name} {pacient.lastName}
              </p>
              <p>Edad: {pacient.age} años</p>

              <br />
            </div>
          ) : null}
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
  width: auto;
  height: auto;
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

UserModal.propTypes = {
  show: PropTypes.bool,
  setShowModal: PropTypes.func,
  appointmentId: PropTypes.string,
};
UserModal.defaultProps = {
  show: false,
  appointmentId: '',
  setShowModal: () => null,
};

export default UserModal;
