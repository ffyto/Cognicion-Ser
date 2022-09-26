import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/dashboard.module.scss';
import Footer from '../../components/footer';
import Booking from '../../components/booking';

function UserHome() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [professional, setProfessional] = useState({});
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setProfessional(profile);
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Booking />
          <p className={styles.description}>
            Hola {professional.name} {professional.lastName}
          </p>

          <p className={styles.description}>
            <small>
              En este espacio, podrá verificar las citas que tiene asignadas,
              modificar su disponibilidad en el calendario y crear servicios.
            </small>
          </p>

          <div className={styles.grid}>
            <Link href='/acerca-de'>
              <a className={styles.card}>
                <h2>Crear Servicios &rarr;</h2>
                <p>Agregue servicios para sus usuarios</p>
              </a>
            </Link>

            <Link
              href={`${BASE_URL}/agenda/${professional.name}-${professional.lastName}`}
            >
              <a className={styles.card}>
                <h2>Verificar Citas &rarr;</h2>
                <p>Verifique las citas que tiene asignadas</p>
              </a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserHome;
