import { useEffect, useState } from 'react';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/agenda.module.scss';
import Footer from '../../components/footer';
import { getAllProfessionalAppointments } from '../../services/appointments';
import UserModal from '../../components/userModal';

function UserAppointments() {
  const [professional, setProfessional] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userAppointments = await getAllProfessionalAppointments();
      setAppointments(userAppointments);
      userAppointments.map(
        appointment => (appointment.date = Date.parse(appointment.date))
      );
    };
    const profile = JSON.parse(localStorage.getItem('profile'));
    setProfessional(profile);
    fetchData();
  }, []);

  const openModal = appointment => {
    setId(appointment._id);
    setShowModal(true);
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
            {appointments.length ? (
              appointments.map(appointment => (
                <li className={styles.card} key={appointment._id}>
                  <h2>{appointment.title}</h2>
                  <p>
                    Fecha de la cita:{' '}
                    <small>
                      {new Date(appointment.date).toLocaleDateString('default')}
                      , Hora:{' '}
                      {new Date(appointment.date).toLocaleTimeString('default')}
                    </small>
                  </p>
                  <p>
                    Paciente:{' '}
                    <small>
                      {appointment.pacient.name} {appointment.pacient.lastName}
                    </small>
                  </p>
                  <p>
                    Estado del pago: <small>{appointment.payment}</small>
                  </p>
                  <section className={styles.buttons__section}>
                    <button
                      className={styles.contact__button}
                      onClick={() => openModal(appointment)}
                    >
                      Información de Contacto
                    </button>

                    {appointment.payment === 'Pendiente' ? (
                      <button
                        className={styles.payment__button}
                        target='_blank'
                      >
                        Cancelar Cita
                      </button>
                    ) : null}
                  </section>
                </li>
              ))
            ) : (
              <p>Cargando...</p>
            )}
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

export default UserAppointments;
