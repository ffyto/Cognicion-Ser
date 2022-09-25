import Header from '../components/header';
import styles from '../styles/pages/contacto.module.scss';
import Footer from '../components/footer';
import Image from 'next/image';

import NavBar from '../components/navBar';

export default function Contact() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <p className={styles.description}>Nuestros Canales de Atención</p>
          <p className={styles.description}>
            <small>
              Escríbanos o llámenos para aclarar sus dudas o agendar una cita
            </small>
          </p>
          <div className={styles.grid}>
            <div className={styles.card}>
              <p>Redes Sociales: @cognicionyser</p>
              <div className='redes'>
                <a href='https://www.facebook.com' target='blank'>
                  <Image
                    width={30}
                    height={30}
                    unoptimized={true}
                    src='/facebook-logo.png'
                    alt='Link a Facebook'
                    className={styles.image}
                  />
                </a>
                <a href='https://www.instagram.com' target='blank'>
                  <Image
                    width={50}
                    height={30}
                    unoptimized={true}
                    src='/instagram-logo.png'
                    className={styles.image}
                    alt='Link a Instagram'
                  />
                </a>
                <a href='https://wa.me/573146052920' target='blank'>
                  <Image
                    width={32}
                    height={32}
                    unoptimized={true}
                    src='/whatsapp-logo.png'
                    className={styles.image}
                    alt='Link a WhatsApp'
                  />
                </a>
              </div>
              <a href='mailto:cognicionyser@gmail.com'>
                Email: cognicionyser@gmail.com
              </a>

              <p>
                Teléfonos: <a href='tel:+573146052920'>3146052920</a> -{' '}
                <a href='tel:+573147842014'>3147842014</a>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>

  );
}
