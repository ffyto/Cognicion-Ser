import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/components/header.module.scss';

export default function Header() {
  return (
    <div>
      <Head>
        <title>Cognición & Ser</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.image}>
        <Link href='/home'>
          <a>
            <Image
              src='/LOGO-colorsinfondo.png'
              width={200}
              height={200}
              alt='Cognición & Ser Logo'
              unoptimized={true}
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
