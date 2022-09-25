import { useState } from 'react';
import styles from '../styles/components/booking.module.scss';
import Calendar from './calendar';
import { createAppointment } from '../services/appointments';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function Booking({ setShowModal }) {
  const [step, setStep] = useState(0);
  const [pacient, setPacient] = useState({});
  const [date, setDate] = useState(null);
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
    let appointment = await createAppointment({ pacient, date, title });
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
        router.push(`/payments/${appointment.data?._id}`);
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
              </div>
              <div className={styles.footer}>
                <button type='submit'>Siguiente</button>
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
                      <option value='Opcion 1'>Opcion 1</option>
                      <option value='Opcion 2'>Opcion 2</option>
                      <option value='Opcion 3'>Opcion 3</option>
                      <option value='Opcion 4'>Opcion 4</option>
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
                  <Calendar date={date} setDate={setDate} />
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
                  disabled={date ? '' : 'disabled'}
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
