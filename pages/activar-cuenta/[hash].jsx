import Header from '../../components/header';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/activar-cuenta.module.scss';
import Footer from '../../components/footer';
import Swal from 'sweetalert2';
import { verifyAccount } from '../../services/auth';
import NavBar from '../../components/navBar';

export default function About() {
  const router = useRouter();
  const { hash } = router.query;

  const activatedAccount = async () => {
    const response = await verifyAccount(hash);
    if (response.error) {
      Swal.fire({
        title: 'El Token es Inválido!',
        text: 'Por favor, genere un nuevo Token.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    const { jwtoken, profile } = response;
    localStorage.setItem('token', jwtoken);
    localStorage.setItem('profile', JSON.stringify(profile));

    Swal.fire({
      title: '¡Su cuenta ha sido activada satisfactoriamente!',
      icon: 'success',
      confirmButtonText: `Aceptar`,
    });
    router.push(`/userhome/${profile.name}-${profile.lastName}`);
  };

  const hanldeActivate = () => {
    activatedAccount();
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <p className={styles.description}>Bienvenido a Cognición & Ser</p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <p>
                Al activar su cuenta, podrá agendar por sí mismo sus citas, de
                acuerdo a la disponibilidad.
              </p>
              <button
                className={styles.activate__button}
                onClick={hanldeActivate}
              >
                {' '}
                Activar Ahora
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
