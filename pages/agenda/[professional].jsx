import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/agenda.module.scss';
import Footer from '../../components/footer';
import {
  getAllProfessionalAppointments,
  deleteAppointment,
} from '../../services/appointments';
import UserModal from '../../components/userModal';

function ProfessionalAppointments() {
  const [professional, setProfessional] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const router = useRouter();

  const notAppointments = profile => {
    Swal.fire({
      title: `¡Ahora mismo no tiene citas asignadas!`,
      icon: 'warning',
      confirmButtonText: `Volver al Dashboard`,
      showCancelButton: true,
      cancelButtonText: `Cerrar`,
    }).then(volver => {
      if (volver.isConfirmed) {
        router.push(`/dashboard/${profile.name}-${profile.lastName}`);
      }
    });
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const fetchData = async () => {
      const professionalAppointments = await getAllProfessionalAppointments();
      if (!professionalAppointments.length) {
        setTimeout(() => {
          notAppointments(profile);
        }, 2000);
      }
      setAppointments(professionalAppointments);
    };
    setProfessional(profile);
    fetchData();
  }, []);

  const openModal = appointment => {
    setId(appointment._id);
    setShowModal(true);
  };

  const handleCancelAppointment = async appointmentId => {
    Swal.fire({
      title: `¿Está seguro(a) de que desea cancelar la cita?`,
      icon: 'warning',
      confirmButtonText: `Cancelar la Cita`,
      showCancelButton: true,
      cancelButtonText: `No cancelar la Cita`,
    }).then(async cancelar => {
      if (cancelar.isConfirmed) {
        const response = await deleteAppointment(appointmentId);
        const { message } = response;

        if (response.status === 404) {
          Swal.fire({
            title: `¡${message}!`,
            icon: 'warning',
            confirmButtonText: `Aceptar`,
          });
        }
        if (response.status === 200) {
          Swal.fire({
            title: `¡${message}!`,
            text: 'Se ha enviado un correo notificando al usuario de la cancelación.',
            icon: 'success',
            confirmButtonText: `Aceptar`,
          }).then(reload => {
            if (reload.isConfirmed) {
              window.location.reload();
            } else if (reload.isDismissed) {
              window.location.reload();
            }
          });
        }
        if (response.status === 500) {
          Swal.fire({
            title: `¡${message}!`,
            text: 'Inténtelo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: `Aceptar`,
          });
        }
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <p className={styles.description}>
            Doctor(a) {professional.name} {professional.lastName}
          </p>
          <p className={styles.description}>
            <small>
              A continuación, puede visualizar sus citas agendadas, y realizar
              la gestión de las mismas.
            </small>
          </p>
          <div className={styles.grid}>
            {appointments.length
              ? appointments.map(appointment => (
                  <li className={styles.card} key={appointment._id}>
                    <h2>{appointment.title}</h2>
                    <p>
                      Fecha de la cita:{' '}
                      <small>
                        {appointment.date.appointmentDay}, Hora:{' '}
                        {appointment.date.appointmentHour}
                      </small>
                    </p>
                    <p>
                      Paciente:{' '}
                      <small>
                        {appointment.pacient.name}{' '}
                        {appointment.pacient.lastName}
                      </small>
                    </p>
                    <p>
                      Estado del pago: <small>{appointment.payment}</small>
                    </p>
                    <section className={styles.buttons__section}>
                      <button
                        type='button'
                        className={styles.contact__button}
                        onClick={() => openModal(appointment)}
                      >
                        Información de Contacto
                      </button>

                      {appointment.payment === 'Pendiente' ? (
                        <button
                          type='button'
                          onClick={() =>
                            handleCancelAppointment(appointment._id)
                          }
                          className={styles.payment__button}
                          target='_blank'
                        >
                          Cancelar Cita
                        </button>
                      ) : null}
                    </section>
                  </li>
                ))
              : null}
          </div>
        </main>
        <UserModal
          setShowModal={setShowModal}
          show={showModal}
          appointmentId={id}
        />
        <Footer />
      </div>
    </>
  );
}

export default ProfessionalAppointments;
