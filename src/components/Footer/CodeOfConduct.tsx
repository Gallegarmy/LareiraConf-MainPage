import { useTranslations } from "@/i18n/utils";

interface CodeOfConductProps {
  lang: string;
}

export default function CodeOfConduct({ lang }: CodeOfConductProps) {
  const t = useTranslations(lang as "es" | "gl");
  const codeOfConduct = t("codeOfConduct");

  return (
    <div className="policy-content">
      <p>{codeOfConduct.intro}</p>
      <p>{codeOfConduct.paragraph1}</p>
      <p>{codeOfConduct.paragraph2}</p>
      <p>{codeOfConduct.paragraph3}</p>
      <p>{codeOfConduct.paragraph4}</p>
      <p>{codeOfConduct.paragraph5}</p>
      <p>{codeOfConduct.paragraph6}</p>
      <p>{codeOfConduct.paragraph7}</p>
      <p>{codeOfConduct.paragraph8}</p>

      <h2>{codeOfConduct.reportingTitle}</h2>
      <p>{codeOfConduct.reportingP1}</p>
      <p>
        {codeOfConduct.reportingP2.before}{" "}
        <a href="mailto:administracion@sysarmygalicia.com">
          administracion@sysarmygalicia.com
        </a>
        {codeOfConduct.reportingP2.after}
      </p>
      <p>{codeOfConduct.reportingP3}</p>
      <ul>
        <li>
          <strong>Ignacio Espósito</strong>:{" "}
          <a
            href="https://t.me/Qrow01"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Qrow01 en Telegram
          </a>
        </li>
        <li>
          <strong>Andrea Magán</strong>:{" "}
          <a
            href="https://t.me/Andrea_MR"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Andrea_MR en Telegram
          </a>
        </li>
        <li>
          <strong>Jesús Perez-Roca</strong>:{" "}
          <a
            href="https://t.me/Yisus1982"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Yisus1982 en Telegram
          </a>
        </li>
        <li>
          <strong>Tiziana Amicarella</strong>:{" "}
          <a
            href="https://t.me/tizianaamicca"
            target="_blank"
            rel="noopener noreferrer"
          >
            @tizianaamicca en Telegram
          </a>
        </li>
      </ul>

      <h2>{codeOfConduct.changesTitle}</h2>
      <p>{codeOfConduct.changesText}</p>

      <h2>{codeOfConduct.contactTitle}</h2>
      <p>{codeOfConduct.contactText}</p>
      <p>
        {codeOfConduct.contactEmail.before}{" "}
        <a href="mailto:administracion@sysarmygalicia.com">
          administracion@sysarmygalicia.com
        </a>
      </p>
      <p>
        <strong>{codeOfConduct.lastUpdate}</strong>
      </p>
    </div>
  );
}
