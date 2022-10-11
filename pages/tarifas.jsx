import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllServices, deleteService } from '../services/services';
import EditServiceModal from '../components/editServiceModal';
import NavBar from '../components/navBar';
import styles from '../styles/pages/tarifas.module.scss';
import Footer from '../components/footer';

function Tarifas() {
  const [services, setServices] = useState([]);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const fetchData = async () => {
    const allServices = await getAllServices();
    allServices.forEach(service =>
      service.includedServices.forEach(includedService => {
        includedService.id = uuid();
      })
    );
    setServices(allServices);
  };

  useEffect(() => {
    fetchData();
    const profile = localStorage.getItem('profile');
    setUser(JSON.parse(profile));
  }, []);

  const handleDeleteService = serviceId => {
    Swal.fire({
      title: `¿Está seguro(a) que desea eliminar este servicio?`,
      text: 'Después de eliminarlo, ya no podrá recuperarlo.',
      icon: 'warning',
      confirmButtonText: `Eliminar Servicio`,
      showCancelButton: true,
      cancelButtonText: `No Eliminar Servicio`,
    }).then(async eliminar => {
      if (eliminar.isConfirmed) {
        const response = await deleteService(serviceId);
        const { message } = response;

        if (response.status === 200) {
          Swal.fire({
            title: `¡${message}!`,
            icon: 'success',
            confirmButtonText: `Aceptar`,
          }).then(reload => {
            if (reload.isConfirmed) {
              window.location.reload();
            } else if (reload.isDismissed) {
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            title: `¡Ha ocurrido un error al intentar eliminar este servicio!`,
            text: 'Inténtelo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: `Aceptar`,
          });
        }
      }
    });
  };

  const handleOpenModal = serviceId => {
    setId(serviceId);
    setShowModal(true);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <p className={styles.description}>
            <small>
              A continuación, puede ver en detalle los servicios que ofrecemos
              en Cognición & Ser:
            </small>
          </p>
          <div className={styles.grid}>
            {services.length ? (
              services.map(service => (
                <li className={styles.card} key={service._id}>
                  <h2>
                    {service.title} <small>({service.modality}) </small>
                  </h2>
                  <section className={styles.service__subtitle}>
                    {service.includedServices?.map(includedService => (
                      <p key={includedService.id}>({includedService.name}) </p>
                    ))}
                  </section>
                  <p>
                    Modalidad: <small>{service.modality}</small>
                  </p>
                  <p>
                    Valor: <small>${service.price?.toLocaleString('es')}</small>
                  </p>
                  <p>Servicios Incluidos:</p>
                  <ul className={styles.service__includedServices__list}>
                    {service.includedServices?.map(includedService => (
                      <li
                        key={includedService.id}
                        className={styles.service__includedServices}
                      >
                        <p>
                          Nombre: <small>{includedService.name}</small>
                        </p>
                        <p>
                          Descripción:{' '}
                          <small>{includedService.description}</small>
                        </p>
                        <p>
                          Número de sesiones:{' '}
                          <small>{includedService.sessions}</small>
                        </p>
                      </li>
                    ))}
                  </ul>
                  {user?.rol === 'professional' ? (
                    <>
                      {' '}
                      <button
                        className={styles.delete__button}
                        type='button'
                        onClick={() => handleDeleteService(service._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        type='button'
                        className={styles.edit__button}
                        onClick={() => handleOpenModal(service._id)}
                      >
                        Editar
                      </button>
                    </>
                  ) : null}
                </li>
              ))
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </main>
        <EditServiceModal
          setShowModal={setShowModal}
          show={showModal}
          id={id}
        />
        <Footer />
      </div>
    </>
  );
}

export default Tarifas;
