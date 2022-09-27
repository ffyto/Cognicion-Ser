import { useState } from 'react';
import styles from '../styles/components/booking.module.scss';
import Calendar from './calendar2';
import { createAppointment } from '../services/appointments';
import { createNonAvailableHour } from '../services/nonAvailableHours';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function Booking({ setShowModal }) {
  const [step, setStep] = useState(0);
  const [pacient, setPacient] = useState({});
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState('');
  const router = useRouter();
  const step_form = step + 1;

  const handlePacient = e => {
    const { value, name } = e.target;
    setPacient({ ...pacient, [name]: value });
  };

  const handleAppointmentTitle = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleAppointment = async () => {
    const appointmentDay = new Date(day).toLocaleDateString('default');
    const appointmentHour = new Date(time).toLocaleTimeString('default');
    const date = { appointmentDay, appointmentHour };
    let appointment = await createAppointment({
      pacient,
      date,
      title,
    });

    await createNonAvailableHour({
      day: appointmentDay,
      hour: appointmentHour,
    });
    appointment = JSON.parse(appointment);

    Swal.fire({
      title: `¡${appointment.message}!`,
      text: 'Tenga en cuenta que debe realizar el pago de la misma con 48 horas de anticipación a la fecha separada, o la cita será cancelada.',
      icon: 'success',
      confirmButtonText: `Pagar ahora`,
      showCancelButton: true,
      cancelButtonText: `Pagar después`,
    }).then(pagarAhora => {
      if (pagarAhora.isConfirmed) {
        router.push(`/pagos/${appointment.data?._id}`);
      } else if (pagarAhora.isDismissed) {
        setShowModal(false);
      }
    });
  };

  if (step == 0) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div>
            <>
              <div className={styles.form_body}>
                <div className={styles.header}>
                  <h4>Datos del Paciente</h4>
                  <span>{step_form}</span>
                </div>
                <div className={styles.form_data}>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='name'
                      type='text'
                      required
                      onChange={handlePacient}
                      defaultValue={pacient.name}
                    />
                    <span>Nombre</span>
                  </div>

                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='lastName'
                      type='text'
                      required
                      onChange={handlePacient}
                      defaultValue={pacient.lastName}
                    />
                    <span>Apellidos</span>
                  </div>

                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='age'
                      type='number'
                      required
                      onChange={handlePacient}
                      defaultValue={pacient.age}
                    />
                    <span>Edad</span>
                  </div>
                </div>
                <div className={styles.footer__initial}>
                  <button type='submit'>Siguiente</button>
                </div>
              </div>
            </>
          </div>
        </div>
      </form>
    );
  } else if (step == 1) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div>
            <>
              <div className={styles.form_body}>
                <div className={styles.header}>
                  <h4>Elija un servicio</h4>
                  <span>{step_form}</span>
                </div>
                <div className={styles.form_data}>
                  <div className={styles.input_field}>
                    <select
                      className={styles.input}
                      required
                      onChange={handleAppointmentTitle}
                      defaultValue={title}
                    >
                      <option value='' disabled hidden>
                        Servicios disponibles
                      </option>
                      <option value='Evaluación neuropsicológica'>
                        Evaluación neuropsicológica ($360.000)
                      </option>
                      <option value='Acompañamiento en cuidados'>
                        Acompañamiento en cuidados ($510.000)
                      </option>
                      <option value='Orientación Docente'>
                        Orientación Docente ($400.000)
                      </option>
                      <option value='Competencias Cognitivas'>
                        Competencias Cognitivas ($600.000)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.footer}>
                <button
                  type='button'
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  Anterior
                </button>
                <button type='submit'>Siguiente</button>
              </div>
            </>
          </div>
        </div>
      </form>
    );
  } else if (step == 2) {
    return (
      <div className={styles.form}>
        <div className={styles.card}>
          <div>
            <>
              <div className={styles.form_body}>
                <div className={styles.header}>
                  <h4>Seleccione una fecha</h4>
                  <span>{step_form}</span>
                </div>
                <div className={styles.form_data}>
                  <Calendar
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                  />
                </div>
              </div>
              <div className={styles.footer}>
                <button
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  Anterior
                </button>
                <button
                  disabled={day || time ? '' : 'disabled'}
                  onClick={handleAppointment}
                >
                  Separar Cita
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default Booking;
