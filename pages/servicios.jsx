import React from 'react';
import Image from 'next/image';
import Header from '../components/header';
import styles from '../styles/pages/servicios.module.scss';
import Footer from '../components/footer';
import NavBar from '../components/navBar';

export default function Services() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <p className={styles.description}>Nuestros Servicios</p>
          <div className={styles.grid}>
            <div className={styles.service}>
              <div className={styles.card}>
                <h2>Evaluación Neuropsicológica presencial y remota </h2>
                <ul>
                  <li>Entrevista inicial o Anamnesis</li>
                  <li>
                    Examen de cada dominio cognitivo:{' '}
                    <small>
                      Atención, memoria, lenguaje, praxias, funciones
                      ejecutivas.
                    </small>
                  </li>
                  <li>Evaluación de inteligencia</li>
                  <li>Informe neuropsicológico Diagnóstico</li>
                  <li>Clínico Recomendaciones</li>
                </ul>
              </div>

              <div className={styles.card}>
                <Image
                  src='/evaluacion.png'
                  alt='Evaluación Neuropsicológica'
                  width={72}
                  height={150}
                  unoptimized
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.service}>
              <div className={styles.card}>
                <Image
                  src='/Rehabilitación_Neuropsicológica.png'
                  alt='Rehabilitación Neuropsicológica'
                  width={72}
                  height={150}
                  unoptimized
                  className={styles.image}
                />
              </div>
              <div className={styles.card}>
                <h2>Rehabilitación y Estimulación Cognitiva</h2>
                <p>Individual o Grupal</p>
              </div>
            </div>
            <div className={styles.service}>
              <div className={styles.card}>
                <h2>Asesoría familiar</h2>
                <ul>
                  <li>Estrategias de estimulación cognitiva en casa</li>
                  <li>
                    Capacitaciones a cuidadores y familiares:{' '}
                    <small>
                      Condiciones de salud, síntomas cognitivos de la patología,
                      evolución y pronóstico.
                    </small>
                  </li>
                </ul>
              </div>
              <div className={styles.card}>
                <Image
                  src='/asesoria-familiar.png'
                  alt='Asesoría familiar'
                  width={72}
                  height={150}
                  unoptimized
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.service}>
              <div className={styles.card}>
                <Image
                  src='/bienestar-cognitovo.png'
                  alt='Asesoría familiar'
                  width={72}
                  height={150}
                  unoptimized
                  className={styles.image}
                />
              </div>
              <div className={styles.card}>
                <h2>Bienestar Cognitivo en entornos educativos</h2>
                <ul>
                  <li>
                    Desarrollo de competencias cognitivas para elección
                    profesional
                  </li>
                  <li>
                    Identificación de estrategias de aprendizaje en el aula
                  </li>
                  <li>
                    Orientación docente:{' '}
                    <small>
                      Trastorno por déficit de atención e hiperactividad,
                      autismos, problemas específicos del aprendizaje, entre
                      otros.
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
