import Header from '../components/header';
import styles from '../styles/pages/solicitar-cita.module.scss';
import Footer from '../components/footer';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/navBar';

export default function PreBook() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <p className={styles.description}>Agende su Cita</p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <p>
                Puede usar nuestros{' '}
                <Link href='/contacto'>
                  <a>canales de atención</a>
                </Link>{' '}
                para solicitar una cita, o{' '}
                <Link href='/registro'>
                  <a>registrarse</a>
                </Link>{' '}
                o{' '}
                <Link href='/login'>
                  <a>iniciar sesión</a>
                </Link>{' '}
                en el sitio para agendarla usted mismo, con base en la
                disponibilidad.
              </p>
              <Image
                width={300}
                height={150}
                quality={100}
                unoptimized={true}
                src='/agendar.png'
                className={styles.image}
                alt='Agendar cita'
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
