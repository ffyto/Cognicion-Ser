import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import styles from '../styles/components/navbar.module.scss';

function NavBar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setUser(profile);
  }, []);

  const closeSession = () => {
    localStorage.clear();
  };

  return (
    <Navbar expand='sm' className={styles.navbar}>
      <Container className={styles.navbar__container}>
        <Navbar.Brand href='/'>
          <Image
            src='/nombrecogyser.png'
            width={200}
            height={50}
            alt='Cognición & Ser Logo'
            quality={100}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/' className={styles.navbar__element}>
              Inicio
            </Nav.Link>
            <Nav.Link href='/acerca-de' className={styles.navbar__element}>
              Nosotros
            </Nav.Link>

            <NavDropdown
              title='Servicios'
              id='basic-nav-dropdown'
              className={styles.navbar__element}
            >
              <NavDropdown.Item href='/servicios'>
                Nuestros Servicios
              </NavDropdown.Item>
              <NavDropdown.Item href='/tarifas'>
                Paquetes y Tarifas
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href='/contacto' className={styles.navbar__element}>
              Contáctenos{' '}
            </Nav.Link>
            {user ? (
              <NavDropdown
                title={user.name}
                id='basic-nav-dropdown'
                className={styles.navbar__element}
              >
                <NavDropdown.Item
                  href={
                    user.rol === 'user'
                      ? `/userhome/${user.name}-${user.lastName}`
                      : `/dashboard/${user.name}-${user.lastName}`
                  }
                >
                  Mi Página
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={
                    user.rol === 'user'
                      ? `/mis-citas/${user.name}-${user.lastName}`
                      : `/agenda/${user.name}-${user.lastName}`
                  }
                >
                  Mis Citas
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/' onClick={closeSession}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title='Usuario'
                id='basic-nav-dropdown'
                className={styles.navbar__element}
              >
                <NavDropdown.Item href='/login'>
                  Iniciar Sesión
                </NavDropdown.Item>
                <NavDropdown.Item href='/registro'>
                  Registrarse
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
