import { useState } from 'react';
import styles from '../styles/components/createService.module.scss';
import { createService } from '../services/services';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function CreateService({ setShowModal }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState({ modality: '' });
  const [includedService, setIncludedService] = useState({});
  console.log(
    '🚀 ~ file: createService.jsx ~ line 13 ~ CreateService ~ includedService',
    includedService
  );
  const router = useRouter();
  const step_form = step + 1;

  const handleService = e => {
    const { value, name } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleIncludedService = e => {
    const { value, name } = e.target;
    setIncludedService({ ...includedService, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setStep(step + 1);
    if (step === 2) {
      async () => {
        let service = await createService({
          modality: service.modality,
          title: service.title,
          price: service.price,
          includedServices,
        });
        service = JSON.parse(appointment);

        Swal.fire({
          title: `¡${service.message}!`,
          text: 'Ahora sus usuarios pueden ver y adquirir este servicio desde sus perfiles',
          icon: 'success',
          confirmButtonText: `Pagar ahora`,
          showCancelButton: true,
          cancelButtonText: `Pagar después`,
        }).then(setShowModal(false));
      };
    }
  };

  const handleCreateService = async () => {
    let appointment = await createService({
      modality: service.modality,
      title: service.title,
      price: service.price,
      includedService,
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
                  <h4>Datos del Servicio</h4>
                  <span>{step_form}</span>
                </div>
                <div className={styles.form_data}>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='title'
                      type='text'
                      required
                      onChange={handleService}
                      defaultValue={service.title}
                    />
                    <span>Título</span>
                  </div>

                  <div className={styles.input_field}>
                    <select
                      className={styles.input}
                      required
                      onChange={handleService}
                      defaultValue={service.modality}
                      name='modality'
                    >
                      <option value='' disabled hidden>
                        Seleccione una Modalidad
                      </option>
                      <option value='Presencial'>Presencial</option>
                      <option value='Virtual'>Virtual</option>
                    </select>
                  </div>

                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='price'
                      type='number'
                      required
                      onChange={handleService}
                      defaultValue={service.price}
                    />
                    <span>Precio</span>
                  </div>
                </div>
                <div className={styles.footer}>
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
                  <h4>Servicios Incluidos</h4>

                  <span>{step_form}</span>
                </div>
                <p>Describa y enumere los servicios incluídos:</p>
                <div className={styles.form_data}>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='name'
                      type='text'
                      required
                      onChange={handleIncludedService}
                      defaultValue={includedService.name}
                    />
                    <span>Nombre del Servicio</span>
                  </div>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='sessions'
                      type='text'
                      required
                      onChange={handleIncludedService}
                      defaultValue={includedService.sessions}
                    />
                    <span>Número de Servicio</span>
                  </div>
                  <div className={styles.input_field}>
                    <textarea
                      className={styles.textarea}
                      name='description'
                      type='text'
                      required
                      onChange={handleIncludedService}
                      defaultValue={includedService.description}
                      placeholder='Descripción del Servicio'
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
                  <button type='submit' onClick={handleCreateService}>
                    Crear Servicio
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </form>
    );
  }
}

export default CreateService;
