import { useEffect, useState } from 'react';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/userhome.module.scss';
import Footer from '../../components/footer';
import Booking from '../../components/booking';
import Link from 'next/link';

function UserHome() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setUser(profile);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <p className={styles.description}>
            Hola {user.name} {user.lastName}
          </p>
          <p className={styles.description}>
            <small>
              En este espacio, podrá verificar la disponibilidad de citas y
              agendarlas por usted mismo.
            </small>
          </p>
          <div className={styles.grid}>
            <button href='/acerca-de'>
              <a className={styles.card}>
                <h2>Agendar Citas &rarr;</h2>
                <p>Agende sus próximas citas</p>
              </a>
            </button>

            <Link href='/servicios'>
              <a className={styles.card}>
                <h2>Mis Citas &rarr;</h2>
                <p>Verifique sus citas ya agendadas</p>
              </a>
            </Link>
          </div>
          <Booking />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserHome;
