import Header from '../components/header';
import styles from '../styles/pages/acerca-de.module.scss';
import Footer from '../components/footer';
import Image from 'next/image';
import NavBar from '../components/navBar';

export default function About() {
  return (
    <>
      {' '}
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <p className={styles.description}>¿Qué es Cognición & Ser?</p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <p>
                Es la unión entre la Cognición que comprende las habilidades
                relaciona- das con los procesos de pensamiento, lenguaje,
                memoria, aprendizaje, percepción, solución de problemas, toma de
                decisiones y creatividad, junto con el Ser que involucra la
                conciencia de sí mismo, comprensión de su situación e
                implementación de estrategias que puedan ayudar al mantenimiento
                de su funcionalidad e independencia.
              </p>
              <Image
                width={400}
                height={150}
                quality={100}
                unoptimized={true}
                src='/acerca-de.png'
                className={styles.image}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
