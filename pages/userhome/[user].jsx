import { useEffect, useState } from 'react';
import Calendar from '../../components/calendar.jsx';
import NavBar from '../../components/navBar';
import styles from '../../styles/pages/userhome.module.scss';
import Footer from '../../components/footer';
import Booking from '../../components/booking';

function UserHome() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setUser(profile);
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <p className={styles.description}>
            Hola {user.name} {user.lastName}
          </p>
          <div className={styles.grid}>
            <div className={styles.card}>
              <p>
                En este espacio, podrá verificar la disponibilidad de citas y
                agendarlas por usted mismo.
              </p>
            </div>
          </div>
          <Booking />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserHome;
