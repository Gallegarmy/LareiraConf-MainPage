import Modal from "./Modal";
import CodeOfConduct from "./CodeOfConduct";
import PrivacyPolicy from "./PrivacyPolicy";
import "./Footer.scss";
import { useTranslations } from "@/i18n/utils";

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const t = useTranslations(lang as "es" | "gl");

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__legal">
          <Modal
            id="code-of-conduct"
            title={t("footer.codeOfConduct")}
            triggerText={t("footer.codeOfConduct")}
          >
            <CodeOfConduct lang={lang} />
          </Modal>
          <p>{t("footer.madeWith")}</p>
        </div>

        <div className="footer__credits">
          <Modal
            id="privacy-policy"
            title={t("footer.privacyPolicy")}
            triggerText={t("footer.privacyPolicy")}
          >
            <PrivacyPolicy lang={lang} />
          </Modal>
          <p>
            {t("footer.hostedBy")}{" "}
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
