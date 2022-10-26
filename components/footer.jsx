import React from 'react';
import Image from 'next/image';
import styles from '../styles/components/footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      ¡Trabajando juntos para seguir activos!{' '}
      <span className={styles.logo}>
        <Image
          src='/LOGOblanco-sinfondp.png'
          alt='Cognición y Ser Logo'
          width={72}
          height={72}
          unoptimized
        />
      </span>
      <div className={styles.redes}>
        <a href='https://www.facebook.com' target='blank'>
          <Image
            width={30}
            height={30}
            unoptimized
            src='/facebook-logo.png'
            alt='Link a Facebook'
          />
        </a>
        <a href='https://www.instagram.com' target='blank'>
          <Image
            width={50}
            height={30}
            unoptimized
            src='/instagram-logo.png'
            alt='Link a Instagram'
          />
        </a>
        <a href='https://wa.me/573146052920' target='blank'>
          <Image
            width={30}
            height={32}
            unoptimized
            src='/whatsapp-logo.png'
            alt='Link a WhatsApp'
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
