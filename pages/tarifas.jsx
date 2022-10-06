import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import styles from '../styles/pages/tarifas.module.scss';
import Footer from '../components/footer';
import { getAllServices } from '../services/services';

function Tarifas() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allServices = await getAllServices();
      setServices(allServices);
    };
    fetchData();
  }, []);

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
                    {service.includedServices.map((includedService, index) => (
                      <p key={service._id + index}>({includedService.name}) </p>
                    ))}
                  </section>
                  <p>
                    Modalidad: <small>{service.modality}</small>
                  </p>
                  <p>
                    Valor: <small>${service.price.toLocaleString('es')}</small>
                  </p>
                  <p>Servicios Incluidos:</p>
                  <ul className={styles.service__includedServices__list}>
                    {service.includedServices.map((includedService, index) => (
                      <li
                        key={service._id + index}
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
                </li>
              ))
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Tarifas;
