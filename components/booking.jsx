import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import Swal from 'sweetalert2';
import styles from '../styles/components/booking.module.scss';
import Calendar from './calendar2';
import { createAppointment } from '../services/appointments';
import { createNonAvailableHour } from '../services/nonAvailableHours';
import { getAllServices } from '../services/services';

function Booking({ setShowModal }) {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [service, setService] = useState('');
  const [pacient, setPacient] = useState({});
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const router = useRouter();

  const stepForm = step + 1;

  useEffect(() => {
    const fetchData = async () => {
      const allServices = await getAllServices();
      setServices(allServices);
    };
    fetchData();
  }, []);

  const handlePacient = e => {
    const { value, name } = e.target;
    setPacient({ ...pacient, [name]: value });
  };

  const handleAppointmentData = e => {
    const id = e.target.value;
    const singleService = services.find(
      uniqueService => uniqueService._id === id
    );
    setTitle(singleService.title);
    setPrice(singleService.price);
    setService(id);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleAppointment = async () => {
    const appointmentDay = new Date(day).toLocaleDateString('default');
    const appointmentHour = new Date(time).toLocaleTimeString('default');
    const date = { appointmentDay, appointmentHour };

    let nonAvailableHour = await createNonAvailableHour({
      day: appointmentDay,
      hour: appointmentHour,
    });
    nonAvailableHour = JSON.parse(nonAvailableHour);

    let appointment = await createAppointment({
      pacient,
      date,
      title,
      price,
      service,
      nonAvailableHour: nonAvailableHour._id,
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

  if (step === 0) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div>
            <div className={styles.form_body}>
              <div className={styles.header}>
                <h4>Datos del Paciente</h4>
                <span>{stepForm}</span>
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
          </div>
        </div>
      </form>
    );
  }
  if (step === 1) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div>
            <div className={styles.form_body}>
              <div className={styles.header}>
                <h4>Elija un servicio</h4>
                <span>{stepForm}</span>
              </div>
              <div className={styles.form_data}>
                <div className={styles.input_field}>
                  <select
                    className={styles.select}
                    required
                    onChange={handleAppointmentData}
                    defaultValue={title}
                  >
                    <option value='' disabled hidden>
                      Servicios disponibles
                    </option>

                    {services.length
                      ? services.map(singleService => (
                          <option
                            value={singleService._id}
                            key={singleService._id}
                            className={styles.services__option}
                          >
                            {singleService.title.toLowerCase()} (
                            {singleService.modality}) ($
                            {singleService.price.toLocaleString('es')})
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <a
                  href='/tarifas'
                  target='blank'
                  className={styles.services__detail}
                >
                  <p>Ver detalle de los Servicios</p>
                </a>
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
          </div>
        </div>
      </form>
    );
  }
  if (step === 2) {
    return (
      <div className={styles.form}>
        <div className={styles.card}>
          <div>
            <div className={styles.form_body}>
              <div className={styles.header}>
                <h4>Seleccione una fecha</h4>
                <span>{stepForm}</span>
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
                type='button'
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                Anterior
              </button>
              <button
                type='button'
                disabled={day || time ? '' : 'disabled'}
                onClick={handleAppointment}
              >
                Separar Cita
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Booking.propTypes = {
  setShowModal: PropTypes.func,
};
Booking.defaultProps = {
  setShowModal: () => null,
};

export default Booking;
