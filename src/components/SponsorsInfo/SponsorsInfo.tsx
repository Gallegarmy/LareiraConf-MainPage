import React from "react";
import "./SponsorsInfo.scss";

const SponsorsInfo: React.FC = () => {
  return (
    <div className="sponsors-info">
      <div className="sponsors-info__container">
        <header className="sponsors-info__header">
          <h1 className="sponsors-info__title">
            Información para Patrocinadores
          </h1>
          <p className="sponsors-info__subtitle">
            LareiraConf 2026 - Toda la información que necesitas
          </p>
        </header>

        <section className="sponsors-info__section">
          <div className="sponsors-info__section-header">
            <span className="sponsors-info__icon">🔥</span>
            <h2>La Previa (Viernes 20 de Marzo)</h2>
          </div>
          <p className="sponsors-info__description">
            Un encuentro informal para empezar a calentar la Lareira y favorecer
            el networking.
          </p>
          <div className="sponsors-info__details">
            <div className="sponsors-info__detail-item">
              <span className="detail-icon">📌</span>
              <div>
                <strong>Cuándo y dónde:</strong>
                <p>
                  Viernes por la tarde de <strong>18:30 a 22:00</strong>
                </p>
                <a
                  href="https://maps.app.goo.gl/r6CcsFRGqngWdHKz8?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsors-info__link"
                >
                  Bellini Rooftop Restaurant & Bar
                </a>
              </div>
            </div>
            <div className="sponsors-info__detail-item">
              <span className="detail-icon">🍺</span>
              <p>La primera ronda corre de nuestra cuenta</p>
            </div>
            <div className="sponsors-info__detail-item">
              <span className="detail-icon">❗️</span>
              <p>
                En este lugar <strong>no habrá stands</strong>, salvo que
                alguien se anime con el <em>item especial de la PREVIA</em>.
              </p>
            </div>
            <div className="sponsors-info__detail-item">
              <p>
                Si os apetece venir a tomar algo, charlar y empezar a conocer a
                los asistentes, estáis más que invitados. Habrá tres
                actividades:{" "}
                <strong>Analítica, Videojuegos y Recruitment</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="sponsors-info__section">
          <div className="sponsors-info__section-header">
            <span className="sponsors-info__icon">🛠️</span>
            <h2>El Día Principal (Sábado 21 de Marzo)</h2>
          </div>
          <div className="sponsors-info__details">
            <div className="sponsors-info__detail-item">
              <span className="detail-icon">📌</span>
              <div>
                <strong>Ubicación y horario:</strong>
                <p>
                  El evento se realizará en el{" "}
                  <a
                    href="https://maps.app.goo.gl/xVhdWzvaprqDynm66?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sponsors-info__link"
                  >
                    Rectorado - UDC
                  </a>
                </p>
                <p>
                  Hora de inicio: <strong>10:00</strong>
                </p>
                <p>
                  Acceso para montaje desde las <strong>8:00</strong>
                </p>
              </div>
            </div>

            <div className="sponsors-info__highlight">
              <h3>Sobre el Stand</h3>
              <p>
                Estamos cerrando algunos detalles y os daremos más información
                próximamente. Como mínimo, podéis contar con:
              </p>
              <ul className="sponsors-info__checklist">
                <li>✅ Mesa</li>
                <li>✅ Sillas</li>
                <li>✅ Punto de electricidad</li>
                <li>… y esperamos poder sumar alguna sorpresa más</li>
              </ul>
            </div>

            <div className="sponsors-info__detail-item">
              <p>
                El evento será de <strong>track único</strong>, con charlas,
                entrevistas y un show sorpresa. Este año hemos reservado más
                tiempo para networking y para que podáis interactuar con los
                asistentes con calma.
              </p>
            </div>
          </div>
        </section>

        <section className="sponsors-info__section">
          <div className="sponsors-info__section-header">
            <span className="sponsors-info__icon">🎉</span>
            <h2>Post-evento: Fiesta y Cena (Sábado 21 de Marzo)</h2>
          </div>
          <p className="sponsors-info__description">
            Una vez finalizado el evento
          </p>
          <div className="sponsors-info__details">
            <div className="sponsors-info__detail-item">
              <span className="detail-icon">📌</span>
              <div>
                <strong>Ubicación y horario:</strong>
                <p>
                  Se llevará a cabo en{" "}
                  <a
                    href="https://maps.app.goo.gl/xu7HCXgorJ9Fy3UG6?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sponsors-info__link"
                  >
                    MALTE Atochas
                  </a>
                </p>
                <p>
                  A partir de las <strong>21:00</strong> (El horario puede
                  variar)
                </p>
              </div>
            </div>
            <div className="sponsors-info__detail-item">
              <span className="detail-icon">🎟️</span>
              <p>
                <strong>Si tu entrada es Full Pass</strong>, significa que
                incluye acceso a la fiesta final con cena, pensada para cerrar
                el evento sin prisas y seguir compartiendo alrededor de la
                Lareira.
              </p>
            </div>
          </div>
        </section>

        <section className="sponsors-info__section sponsors-info__section--cta">
          <div className="sponsors-info__section-header">
            <span className="sponsors-info__icon">🎟️</span>
            <h2>Entradas de Patrocinador</h2>
          </div>
          <p className="sponsors-info__description">
            Para gestionar las invitaciones de forma ordenada, os pedimos que
            solicitéis vuestras entradas a través de este formulario:
          </p>
          <div className="sponsors-info__cta-buttons">
            <a
              href="#"
              className="sponsors-info__button sponsors-info__button--primary"
            >
              Solicitar Entradas
            </a>
          </div>
        </section>

        <section className="sponsors-info__section sponsors-info__section--resources">
          <div className="sponsors-info__section-header">
            <span className="sponsors-info__icon">📄</span>
            <h2>Recursos Adicionales</h2>
          </div>
          <div className="sponsors-info__cta-buttons">
            <a
              href="https://lareiraconfsponsordeck.my.canva.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="sponsors-info__button sponsors-info__button--secondary"
            >
              Ver Dossier de Patrocinio
            </a>
          </div>
        </section>

        <footer className="sponsors-info__footer">
          <p>
            ¿Tienes alguna pregunta?{" "}
            <a href="/contact" className="sponsors-info__link">
              Contáctanos
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SponsorsInfo;
