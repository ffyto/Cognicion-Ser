import { useState } from 'react';
import styles from '../styles/components/createService.module.scss';
import { createService } from '../services/services';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

function ServiceCreation({ setShowModal }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState({ modality: '' });
  const [specificService, setSpecificService] = useState({});
  const [includedServices, setIncludedServices] = useState([]);
  console.log(
    '🚀 ~ file: createService.jsx ~ line 11 ~ ServiceCreation ~ includedServices',
    includedServices
  );
  console.log(
    '🚀 ~ file: createService.jsx ~ line 13 ~ CreateService ~ includedService',
    specificService
  );

  const step_form = step + 1;

  const handleService = e => {
    const { value, name } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSpecificService = e => {
    const { value, name } = e.target;
    setSpecificService({ ...specificService, [name]: value, id: uuid() });
  };
  const handleCreateSpecificService = () => {
    setIncludedServices([...includedServices, specificService]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setStep(step + 1);
    if (step === 2) {
      async () => {
        let newService = await createService({
          modality: service.modality,
          title: service.title,
          price: service.price,
          includedServices,
        });
        newService = JSON.parse(appointment);

        if (newService.error) {
          Swal.fire({
            title: `¡${newService.message}!`,
            text: 'Intentelo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: `Aceptar`,
          }).then(setShowModal(false));
        }

        Swal.fire({
          title: `¡${newService.message}!`,
          text: 'Ahora sus usuarios pueden ver y adquirir este servicio desde sus perfiles',
          icon: 'success',
          confirmButtonText: `Aceptar`,
        }).then(setShowModal(false));
      };
    }
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
                <p>Describa y enumere los Sub-servicios incluídos:</p>
                <div className={styles.form_data}>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='name'
                      type='text'
                      required
                      onChange={handleSpecificService}
                      defaultValue={specificService.name}
                    />
                    <span>Nombre del Servicio</span>
                  </div>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='sessions'
                      type='text'
                      required
                      onChange={handleSpecificService}
                      defaultValue={specificService.sessions}
                    />
                    <span>Número de Sesiones</span>
                  </div>
                  <div className={styles.input_field}>
                    <textarea
                      className={styles.textarea}
                      name='description'
                      type='text'
                      required
                      onChange={handleSpecificService}
                      defaultValue={specificService.description}
                      placeholder='Descripción del Servicio'
                    />
                  </div>
                  {includedServices.length ? (
                    <ul className={styles.includedServicesList}>
                      <p>Servicios a Incluir:</p>
                      {includedServices.map(includedService => (
                        <li
                          key={includedService.id}
                          className={styles.includedService}
                        >
                          {includedService.name}
                          <button
                            className={styles.delete__button}
                            type='button'
                          >
                            <i className='fa-solid fa-trash' />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <button type='button' onClick={handleCreateSpecificService}>
                    Agregar Sub-servicio
                  </button>
                </div>
                <div className={styles.footer}>
                  <button
                    onClick={() => {
                      setStep(step - 1);
                    }}
                  >
                    Anterior
                  </button>
                  <button type='submit'>Crear Servicio</button>
                </div>
              </div>
            </>
          </div>
        </div>
      </form>
    );
  }
}

export default ServiceCreation;
