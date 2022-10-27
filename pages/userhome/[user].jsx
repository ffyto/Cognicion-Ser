/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/userhome.module.scss';
import Footer from '../../components/footer';
import Modal from '../../components/modal';
import { findAppointmentByPaymentAndUpdate } from '../../services/appointments';

function UserHome() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { preference_id, status } = router.query;

  useEffect(() => {
    const paymentId = preference_id;
    const appointmetUpdate = async () => {
      await findAppointmentByPaymentAndUpdate(paymentId, {
        payment: 'Pagado',
      });
    };
    const profile = JSON.parse(localStorage.getItem('profile'));
    setUser(profile);
    if (status === 'approved') {
      appointmetUpdate();
    }
  }, [status]);

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
            <button
              className={styles.card}
              type='button'
              href='/acerca-de'
              onClick={handleOpenModal}
            >
              <h2>Agendar Citas &rarr;</h2>
              <p>Agende sus próximas citas</p>
            </button>

            <Link href={`/mis-citas/${user.name}-${user.lastName}`}>
              <div className={styles.card}>
                <h2>Mis Citas &rarr;</h2>
                <p>Verifique sus citas ya agendadas</p>
              </div>
            </Link>

            <Link href='/tarifas'>
              <div className={styles.card}>
                <h2>Servicios &rarr;</h2>
                <p>Vea en detalle los servicios que ofrecemos</p>
              </div>
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
