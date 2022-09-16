import Header from '../components/header';
import styles from '../styles/pages/servicios.module.scss';
import Footer from '../components/footer';
// import Image from 'next/image';

export default function Services() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <p className={styles.description}>Nuestros Servicios</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Evaluación Neuropsicológica presencial y remota </h2>
            <ul>
              <li>Entrevista inicial o Anamnesis</li>
              <li>
                Examen de cada dominio cognitivo:{' '}
                <small>
                  Atención, memoria, lenguaje, praxias, funciones ejecutivas.
                </small>
              </li>
              <li>Evaluación de inteligencia</li>
              <li>Informe neuropsicológico Diagnóstico</li>
              <li>Clínico Recomendaciones</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Nuestros Servicios &rarr;</h2>
            <p>Conozca nuestro portafolio de servicios</p>
          </div>

          <div className={styles.card}>
            <h2>Separe una cita &rarr;</h2>
            <p>Contrate nuestros servicios</p>
          </div>

          <div className={styles.card}>
            <h2>Contáctenos &rarr;</h2>
            <p>Conozca nuestros canales de atención</p>
          </div>

          <div className={styles.card}>
            <h2>Contáctenos &rarr;</h2>
            <p>Conozca nuestros canales de atención</p>
          </div>
          <div className={styles.card}>
            <h2>Contáctenos &rarr;</h2>
            <p>Conozca nuestros canales de atención</p>
          </div>
          <div className={styles.card}>
            <h2>Contáctenos &rarr;</h2>
            <p>Conozca nuestros canales de atención</p>
          </div>
          <div className={styles.card}>
            <h2>Contáctenos &rarr;</h2>
            <p>Conozca nuestros canales de atención</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
