import Modal from "./Modal";
import CodeOfConduct from "./CodeOfConduct";
import PrivacyPolicy from "./PrivacyPolicy";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__legal">
          <Modal
            id="code-of-conduct"
            title="Código de conducta"
            triggerText="Código de conducta"
          >
            <CodeOfConduct />
          </Modal>
          <p>Made with ♥ by LAREIRACONF CREW</p>
        </div>

        <div className="footer__credits">
          <Modal
            id="privacy-policy"
            title="Política de privacidad"
            triggerText="Política de privacidad"
          >
            <PrivacyPolicy />
          </Modal>
          <p>
            Hosted by{" "}
            <a
              href="https://raiolanetworks.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Raiola Networks
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
