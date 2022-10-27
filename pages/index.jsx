import React from 'react';
import Link from 'next/link';
import Header from '../components/header';
import styles from '../styles/pages/home.module.scss';
import Footer from '../components/footer';
import NavBar from '../components/navBar';

export default function Home() {
  return (
    <>
      {' '}
      <NavBar />
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
              <div className={styles.card}>
                <h2>Quiénes somos &rarr;</h2>
                <p>Conozca acerca de nosotros</p>
              </div>
            </Link>

            <Link href='/servicios'>
              <div className={styles.card}>
                <h2>Nuestros Servicios &rarr;</h2>
                <p>Conozca nuestro portafolio de servicios</p>
              </div>
            </Link>

            <Link href='/solicitar-cita'>
              <div className={styles.card}>
                <h2>Separe su cita &rarr;</h2>
                <p>Agende una cita con nuestros profesionales</p>
              </div>
            </Link>

            <Link href='/contacto'>
              <div className={styles.card}>
                <h2>Contáctenos &rarr;</h2>
                <p>Conozca nuestros canales de atención</p>
              </div>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
