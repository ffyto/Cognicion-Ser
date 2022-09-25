import { useEffect, useState } from 'react';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/userhome.module.scss';
import Footer from '../../components/footer';
import Modal from '../../components/modal';
import Link from 'next/link';

function UserHome() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setUser(profile);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
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
            <button href='/acerca-de' onClick={handleOpenModal}>
              <a className={styles.card}>
                <h2>Agendar Citas &rarr;</h2>
                <p>Agende sus próximas citas</p>
              </a>
            </button>

            <Link href={`/mis-citas/${user.name}-${user.lastName}`}>
              <a className={styles.card}>
                <h2>Mis Citas &rarr;</h2>
                <p>Verifique sus citas ya agendadas</p>
              </a>
            </Link>
          </div>
          <Modal setShowModal={setShowModal} show={showModal} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserHome;
