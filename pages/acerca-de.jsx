import Header from '../components/header';

import styles from '../styles/pages/acerca-de.module.scss';
import Footer from '../components/footer';
import Image from 'next/image';
import NavBar from '../components/navBar';

export default function About() {
  return (
    <>
      {' '}
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <p className={styles.description}>¿Qué es Cognición & Ser?</p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <p>
                {' '}
                <small>
                  Es un servicio brindado por profesionales especialistas en la
                  evaluación, diagnóstico neuropsicológico, rehabilitación y
                  estimulación cognitiva dirigido a adolescentes, jóvenes y
                  adultos de acuerdo a sus necesidades específicas.{' '}
                </small>
                <br />
                <br />
                <small>
                  Es además, la unión entre la Cognición que comprende las
                  habilidades relaciona- das con los procesos de pensamiento,
                  lenguaje, memoria, aprendizaje, percepción, solución de
                  problemas, toma de decisiones y creatividad, junto con el Ser
                  que involucra la conciencia de sí mismo, comprensión de su
                  situación e implementación de estrategias que puedan ayudar al
                  mantenimiento de su funcionalidad e independencia.
                </small>
              </p>
              <br />
              <p>
                Nuetra Misión: {''}
                <small>
                  Somos un equipo que busca la prestación de un servicio
                  interdisciplinario y de calidad desde las bases clínicas y
                  experimentales que enmarcan las relaciones cerebro-
                  conducta/cognición.
                </small>
              </p>
              <br />
              <p>
                Nuetra Visión: {''}
                <small>
                  En el año 2026 Cognición &amp; Ser será un referente en la
                  ciudad de Medellín y en otros lugares del país en la
                  prestación de servicios que involucran la atención de los
                  trastornos de la neurocognición y del comportamiento que
                  afecta la salud mental de las personas.
                </small>
              </p>
              <br />
              <p>
                Nuetro Equipo: {''}
                <small>
                  Somos profesionales con alta experiencia clínica, con pregrado
                  en Psicología, Posgrado en Neuropsicología y especialista en
                  gerontología. Contamos con el trabajo en conjunto de médico
                  neurólogo y medicina general.
                </small>
              </p>
              <br />
              <p>
                Nuetros Valores: {''}
                <small>
                  Respeto por el Otro, Dedicación, Profesionalismo y Empatía.
                </small>
              </p>
              <Image
                width={400}
                height={150}
                unoptimized={true}
                src='/acerca-de.png'
                className={styles.image}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>

  );
}
