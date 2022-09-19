import { useState } from 'react';
import Header from '../components/header';
import styles from '../styles/pages/login.module.scss';
import Footer from '../components/footer';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({});

  const handleChange = e => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = e => {
    e.preventDefault();
    // newUser();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <form className={styles.login__form} onSubmit={handleLogin}>
          <h1>Inicio de Sesión</h1>
          <span className={styles.login__label}>
            Email <span className={styles.login__label__span}>*</span>
          </span>
          <input
            className={styles.login__email}
            type='email'
            name='email'
            placeholder=' Ingrese su correo electrónico'
            required
            onChange={handleChange}
          />
          <span className={styles.login__label}>
            Contraseña <span className={styles.login__label__span}>*</span>
          </span>
          <input
            className={styles.login__password}
            type='password'
            name='password'
            placeholder=' Digite una contraseña'
            required
            onChange={handleChange}
          />
          <button type='submit' className={styles.login__button}>
            <b>Iniciar Sesión</b>{' '}
          </button>
          <hr />
          <Link href='/registro'>
            <a>¿No tiene una cuenta? Regístrese</a>
          </Link>
        </form>
      </main>
      <Footer />
    </div>
  );
}
