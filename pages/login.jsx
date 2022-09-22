import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Header from '../components/header';
import styles from '../styles/pages/login.module.scss';
import Footer from '../components/footer';
import Link from 'next/link';
import { loginHandler } from '../services/auth';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState();

  const handleInput = e => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    const response = await loginHandler(form.email, form.password);

    const { profile, jwtoken, message } = response;

    if (profile) {
      localStorage.setItem('token', jwtoken);
      localStorage.setItem('profile', JSON.stringify(profile));
      Swal.fire({
        title: message,
        icon: 'success',
        confirmButtonText: `Aceptar`,
      });
      router.push(`/userhome/${profile.name}-${profile.lastName}`);
    } else {
      Swal.fire({
        title: message,
        text: 'Por favor, verifique que las credenciales ingresadas son correctas.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <form
          className={styles.login__form}
          onSubmit={handleLogin}
          autoComplete='nope'
        >
          <h1>Inicio de Sesión</h1>
          <span className={styles.login__label}>
            Email <span className={styles.login__label__span}>*</span>
          </span>
          <input
            autoComplete='nope'
            className={styles.login__email}
            type='email'
            name='email'
            placeholder=' Ingrese su correo electrónico'
            required
            onInput={handleInput}
          />
          <span className={styles.login__label}>
            Contraseña <span className={styles.login__label__span}>*</span>
          </span>
          <input
            autoComplete='nope'
            className={styles.login__password}
            type='password'
            name='password'
            placeholder=' Digite una contraseña'
            required
            onInput={handleInput}
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
