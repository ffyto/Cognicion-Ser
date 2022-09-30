import { useState } from 'react';
import { getUserByEmail, createUser } from '../services/users';
import { useRouter } from 'next/router';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import Header from '../components/header';
import styles from '../styles/pages/registro.module.scss';
import Footer from '../components/footer';
import Link from 'next/link';

registerLocale('es', es);

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [startDate, setStartDate] = useState(null);

  const handleChange = e => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const newUser = async () => {
    const user = await getUserByEmail(form.email);

    if (user.email) {
      Swal.fire({
        title: '¡Este email ya está registrado!',
        text: 'Por favor, introduzca otro email o incie sesión.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    } else if (form.password !== form.confirmPassword) {
      Swal.fire({
        title: '¡Las contraseñas ingresadas no coinciden!',
        text: 'La contraseña y su confirmación deben ser iguales.',
        confirmButtonText: 'Aceptar',
      });
    } else {
      form.birthday = startDate;
      const response = await createUser(form);
      const res = JSON.parse(response);
      if (res.details) {
        if (res.details[0].message.includes('name')) {
          res.details[0].message = `¡El nombre ingresado debe tener una longitud de entre 2 y 20 caracteres!`;
        }
        if (res.details[0].message.includes('lastName')) {
          res.details[0].message = `¡El Apellido o apellidos ingresados deben tener una longitud de entre 2 y 30 caracteres!`;
        }
        if (res.details[0].message.includes('age')) {
          res.details[0].message = `¡Debe ser mayor de edad para registrarse!`;
        }
        if (res.details[0].message.includes('phoneNumber')) {
          res.details[0].message = `¡El número celular debe tener una longitid de exactamente 10 caracteres!`;
        }
        if (res.details[0].message.includes('email')) {
          res.details[0].message = `¡El email ingresado no es válido!`;
        }
        if (res.details[0].message.includes('password')) {
          res.details[0].message = `¡La contraseña debe tener una longitud de entre 8 y 15 caracteres, y debe incluir al menos una letra mayúscula y una minúscula, un caracter especial y un número!`;
        }

        Swal.fire({
          title: res.details[0].message,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
      Swal.fire({
        title: 'Su cuenta ha sido creada!',
        text: 'Por favor, revise su correo electrónico para activar la cuenta.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      router.push('/');
    }
  };

  const handleSignUp = e => {
    e.preventDefault();
    newUser();
  };

  const [mobile, setMobile] = useState('');

  const numberHandler = val => {
    const validatedValue = val.target.value.replace(/[^0-9]/g, '');
    setMobile(validatedValue);
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
            locale='es'
            placeholderText='Ingrese su fecha de nacimiento'
            selected={startDate}
            onChange={date => setStartDate(date)}
            className={styles.signupForm__birthday}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
          <span className={styles.signup__label}>
            Número Celular <span className={styles.signup__label__span}>*</span>
          </span>
          <input
            className={styles.signupForm__email}
            type='tel'
            name='phoneNumber'
            placeholder=' Ingrese su número celular'
            required
            onInput={e => numberHandler(e)}
            onChange={handleChange}
            value={mobile}
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
