import { useState, useEffect } from 'react';
import styles from '../styles/components/editService.module.scss';
import { updateService, getSingleService } from '../services/services';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ServiceEdition({ setShowModal, id }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState({ modality: '' });
  const [subService, setSubService] = useState({});
  const [includedServices, setIncludedServices] = useState([]);

  const step_form = step + 1;

  const getService = async () => {
    const singleService = await getSingleService(id);
    setService(singleService);
    setIncludedServices(singleService.includedServices);
  };

  useEffect(() => {
    getService();
  }, []);

  const handleService = e => {
    const { value, name } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubService = e => {
    const { value, name } = e.target;
    setSubService({ ...subService, [name]: value, id: uuid() });
  };

  const handleCreateSubService = () => {
    if (subService.name && subService.sessions && subService.description) {
      setIncludedServices([...includedServices, subService]);
      document.getElementById('subService.name').value = '';
      document.getElementById('subService.sessions').value = '';
      document.getElementById('subService.description').value = '';
      setSubService({});
    }
  };

  const handleDeleteSubService = id => {
    const newIncludedServices = includedServices.filter(
      subService => subService.id !== id
    );
    setIncludedServices(newIncludedServices);
  };

  const handleUpdateService = async () => {
    if (!includedServices.length) {
      Swal.fire({
        title: `¡Debe agregar por lo menos un Sub-servicio!`,
        icon: 'warning',
        confirmButtonText: `Aceptar`,
      });
      return;
    }

    const newService = await updateService(id, {
      modality: service.modality,
      title: service.title,
      price: service.price,
      includedServices,
    });

    if (newService.error) {
      Swal.fire({
        title: `¡${newService.message}!`,
        text: 'Intentelo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: `Aceptar`,
      });
    }

    if (newService.status === 500) {
      Swal.fire({
        title: `¡${newService.message}!`,
        text: 'Intentelo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: `Aceptar`,
      });
    }
    if (newService.message.includes('autorizado')) {
      Swal.fire({
        title: `¡${newService.message}!`,
        icon: 'warning',
        confirmButtonText: `Aceptar`,
      }).then(setShowModal(false));
    } else {
      Swal.fire({
        title: `¡${newService.message}!`,
        icon: 'success',
        confirmButtonText: `Aceptar`,
      }).then(reload => {
        if (reload.Confirm) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStep(step + 1);
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
                    <small>Modalidad</small>
                    <select
                      className={styles.input}
                      required
                      onChange={handleService}
                      value={service.modality}
                      name='modality'
                    >
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
                <p>Describa los Sub-servicios incluídos:</p>
                <div className={styles.form_data}>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='name'
                      type='text'
                      required
                      onChange={handleSubService}
                      defaultValue={subService.name}
                      id='subService.name'
                    />
                    <span>Nombre del Sub-servicio</span>
                  </div>
                  <div className={styles.input_field}>
                    <input
                      className={styles.input}
                      name='sessions'
                      type='text'
                      required
                      onChange={handleSubService}
                      defaultValue={subService.sessions}
                      id='subService.sessions'
                    />
                    <span>Número de Sesiones</span>
                  </div>
                  <div className={styles.input_field}>
                    <textarea
                      className={styles.textarea}
                      name='description'
                      type='text'
                      required
                      onChange={handleSubService}
                      defaultValue={subService.description}
                      placeholder='Descripción del Sub-servicio'
                      id='subService.description'
                    />
                  </div>
                  {includedServices?.length ? (
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
                            onClick={() =>
                              handleDeleteSubService(includedService.id)
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <section className={styles.addSubService__button__section}>
                    <button
                      type='button'
                      onClick={handleCreateSubService}
                      className={styles.addSubService__button}
                    >
                      Agregar Sub-servicio
                    </button>
                  </section>
                </div>
                <div className={styles.footer}>
                  <button
                    onClick={() => {
                      setStep(step - 1);
                    }}
                  >
                    Anterior
                  </button>
                  <button type='button' onClick={handleUpdateService}>
                    Actualizar Servicio
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

export default ServiceEdition;
