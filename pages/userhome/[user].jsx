import Calendar from '../../components/calendar.jsx';
import Header from '../../components/header';
import styles from '../../styles/pages/userhome.module.scss';
import Footer from '../../components/footer';

function UserHome() {
  const profile = JSON.parse(localStorage.getItem('profile'));

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />

        <p className={styles.description}>
          Hola {profile.name} {profile.lastName}
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p>
              En este espacio, podrá verificar la disponibilidad de citas y
              agendarlas por usted mismo.
            </p>
          </div>
        </div>
        <Calendar />
      </main>
      <Footer />
    </div>
  );
}

export default UserHome;
