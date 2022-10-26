import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/mis-citas.module.scss';
import Footer from '../../components/footer';
import { getAllUserAppointments } from '../../services/appointments';

function UserAppointments() {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  const notAppointments = profile => {
    Swal.fire({
      title: `¡Aún no ha generado ninguna cita!`,
      text: 'Puede agendar citas desde su página de usuario.',
      icon: 'warning',
      confirmButtonText: `Volver a la página de usuario`,
      showCancelButton: true,
      cancelButtonText: `Cerrar`,
    }).then(volver => {
      if (volver.isConfirmed) {
        router.push(`/userhome/${profile.name}-${profile.lastName}`);
      }
    });
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const fetchData = async () => {
      const userAppointments = await getAllUserAppointments();
      if (!userAppointments.length) {
        setTimeout(() => {
          notAppointments(profile);
        }, 2000);
      }
      setAppointments(userAppointments);
    };
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
                      >
                        Realizar Pago
                      </a>
                    ) : null}
                  </li>
                ))
              : null}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserAppointments;
