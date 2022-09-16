import styles from '../styles/components/footer.module.scss';
import Image from 'next/image';

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
          unoptimized={true}
        />
      </span>
    </footer>
  );
}

export default Footer;
