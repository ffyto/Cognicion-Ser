import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/createService.module.scss';
import { createService } from '../services/services';

function ServiceCreation({ setShowModal }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState({ modality: '' });
  const [subService, setSubService] = useState({});
  const [includedServices, setIncludedServices] = useState([]);

  const stepForm = step + 1;

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
      includedService => includedService.id !== id
    );
    setIncludedServices(newIncludedServices);
  };

  const handleCreateService = async () => {
    if (!includedServices.length) {
      Swal.fire({
        title: `¡Debe agregar por lo menos un Sub-servicio!`,
        icon: 'warning',
        confirmButtonText: `Aceptar`,
      });
      return;
    }

    let newService = await createService({
      modality: service.modality,
      title: service.title,
      price: service.price,
      includedServices,
    });

    newService = JSON.parse(newService);

    if (newService.error) {
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
        text: 'Ahora sus usuarios pueden ver y adquirir este servicio desde sus perfiles.',
        icon: 'success',
        confirmButtonText: `Aceptar`,
      }).then(setShowModal(false));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStep(step + 1);
  };

  if (step === 0) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div>
            <div className={styles.form_body}>
              <div className={styles.header}>
                <h4>Datos del Servicio</h4>
                <span>{stepForm}</span>
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
                <h4>Servicios Incluidos</h4>

                <span>{stepForm}</span>
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
                  type='button'
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  Anterior
                </button>
                <button type='button' onClick={handleCreateService}>
                  Crear Servicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ServiceCreation.propTypes = {
  setShowModal: PropTypes.func,
};
ServiceCreation.defaultProps = {
  setShowModal: () => null,
};

export default ServiceCreation;
