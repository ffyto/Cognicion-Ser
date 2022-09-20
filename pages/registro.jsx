import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../components/header';
import styles from '../styles/pages/registro.module.scss';
import Footer from '../components/footer';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = e => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = e => {
    e.preventDefault();
    // newUser();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <form className={styles.signupForm__form} onSubmit={handleSignUp}>
          <h1>Formulario de Registro</h1>

          <span className={styles.signup__label}>
            Nombre <span className={styles.signup__label__span}>*</span>
          </span>
          <input
            className={styles.signupForm__name}
            type='text'
            name='name'
            placeholder=' Ingrese su nombre'
            required
            onChange={handleChange}
          />
          <span className={styles.signup__label}>
            Apellidos <span className={styles.signup__label__span}>*</span>
          </span>
          <input
            className={styles.signupForm__lastName}
            type='text'
            name='lastName'
            placeholder=' Ingrese sus apellidos'
            required
            onChange={handleChange}
          />
          <span className={styles.signup__label}>
            Fecha de Nacimiento{' '}
            <span className={styles.signup__label__span}>*</span>
          </span>

          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            className={styles.signupForm__birthday}
          />

          <span className={styles.signup__label}>
            Email <span className={styles.signup__label__span}>*</span>
          </span>
          <input
            className={styles.signupForm__email}
            type='email'
            name='email'
            placeholder=' Ingrese su correo electrónico'
            required
            onChange={handleChange}
          />
          <span className={styles.signup__label}>
            Contraseña <span className={styles.signup__label__span}>*</span>
          </span>
          <input
            className={styles.signupForm__password}
            type='password'
            name='password'
            placeholder=' Digite una contraseña'
            required
            onChange={handleChange}
          />
          <span className={styles.signup__label}>
            Confirme su contraseña{' '}
            <span className={styles.signup__label__span}>*</span>
          </span>
          <input
            className={styles.signupForm__password}
            type='password'
            name='confirmPassword'
            placeholder=' Confirme su contraseña'
            required
            onChange={handleChange}
          />

          <button type='submit' className={styles.signupForm__button}>
            <b>Registrarse</b>{' '}
          </button>
          <hr />
          <Link href='/login'>
            <a>¿Ya tiene una cuenta? Inicie sesión</a>
          </Link>
        </form>
      </main>
      <Footer />
    </div>
  );
}
