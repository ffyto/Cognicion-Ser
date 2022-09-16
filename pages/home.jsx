import Header from '../components/header';
import Image from 'next/image';
import styles from '../styles/pages/home.module.scss';
import Link from 'next/link';
import Footer from '../components/footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <p className={styles.description}>
          Evaluación Neuropsicológica y Rehabilitación Cognitiva
        </p>
        <p className={styles.description}>
          <small>Atención Presencial y Virtual</small>
        </p>

        <div className={styles.grid}>
          <Link href='/acerca-de'>
            <a className={styles.card}>
              <h2>Quiénes somos &rarr;</h2>
              <p>Conozca acerca de nosotros</p>
            </a>
          </Link>

          <Link href='/servicios'>
            <a className={styles.card}>
              <h2>Nuestros Servicios &rarr;</h2>
              <p>Conozca nuestro portafolio de servicios</p>
            </a>
          </Link>

          <Link href='/solicitar-cita'>
            <a className={styles.card}>
              <h2>Separe una cita &rarr;</h2>
              <p>Contrate nuestros servicios</p>
            </a>
          </Link>

          <Link href='/contacto'>
            <a className={styles.card}>
              <h2>Contáctenos &rarr;</h2>
              <p>Conozca nuestros canales de atención</p>
            </a>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
