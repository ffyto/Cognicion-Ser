import { useEffect, useState } from 'react';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/mis-citas.module.scss';
import Footer from '../../components/footer';
import { getAllUserAppointments } from '../../services/appointments';

function UserAppointments() {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userAppointments = await getAllUserAppointments();
      setAppointments(userAppointments);
      userAppointments.map(
        appointment => (appointment.date = Date.parse(appointment.date))
      );
    };
    const profile = JSON.parse(localStorage.getItem('profile'));
    setUser(profile);
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <p className={styles.description}>
            Hola {user.name} {user.lastName}
          </p>
          <p className={styles.description}>
            <small>
              A continuación, puede visualizar sus citas agendadas. También
              puede realizar los pagos pendientes.
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
                    Profesional a cargo:{' '}
                    <small>
                      {appointment.professional.name}{' '}
                      {appointment.professional.lastName}
                    </small>
                  </p>
                  <p>
                    Estado del pago: <small>{appointment.payment}</small>
                  </p>
                  {appointment.payment === 'Pendiente' ? (
                    <a
                      href={`/pagos/${appointment._id}`}
                      className={styles.payment__button}
                      target='_blank'
                    >
                      Realizar Pago
                    </a>
                  ) : null}
                </li>
              ))
            ) : (
              <h2>Aún no tiene citas agendadas</h2>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserAppointments;
