import { useTranslations } from "@/i18n/utils";

interface PrivacyPolicyProps {
  lang: string;
}

export default function PrivacyPolicy({ lang }: PrivacyPolicyProps) {
  const t = useTranslations(lang as "es" | "gl");
  const privacy = t("privacyPolicy");
  return (
    <div className="policy-content">
      <p>{privacy.intro}</p>

      <h2>{privacy.responsibleTitle}</h2>
      <p>{privacy.responsibleP1}</p>
      <p>
        {privacy.responsibleP2.before}{" "}
        <a href="mailto:administracion@sysarmygalicia.com">
          administracion@sysarmygalicia.com
        </a>
        {privacy.responsibleP2.after}
      </p>

      <h2>{privacy.dataCollectedTitle}</h2>
      <p>{privacy.dataCollectedIntro}</p>
      <ul>
        <li>{privacy.dataCollected.item1}</li>
        <li>{privacy.dataCollected.item2}</li>
        <li>{privacy.dataCollected.item3}</li>
      </ul>

      <h3>{privacy.attendeeDataTitle}</h3>
      <ul>
        <li>
          <strong>{privacy.attendeeData.identifiers.title}</strong>:{" "}
          {privacy.attendeeData.identifiers.data}
        </li>
        <li>
          <strong>{privacy.attendeeData.contact.title}</strong>:{" "}
          {privacy.attendeeData.contact.data}
        </li>
        <li>
          <strong>{privacy.attendeeData.personal.title}</strong>:{" "}
          {privacy.attendeeData.personal.data}
        </li>
        <li>
          <strong>{privacy.attendeeData.academic.title}</strong>:{" "}
          {privacy.attendeeData.academic.data}
        </li>
        <li>
          <strong>{privacy.attendeeData.health.title}</strong>:{" "}
          {privacy.attendeeData.health.data}
        </li>
        <li>
          <strong>{privacy.attendeeData.media.title}</strong>:{" "}
          {privacy.attendeeData.media.data}
        </li>
      </ul>

      <h3>{privacy.sponsorDataTitle}</h3>
      <ul>
        <li>
          <strong>{privacy.sponsorData.identifiers.title}</strong>:{" "}
          {privacy.sponsorData.identifiers.data}
        </li>
        <li>
          <strong>{privacy.sponsorData.businessContact.title}</strong>:{" "}
          {privacy.sponsorData.businessContact.data}
        </li>
        <li>
          <strong>{privacy.sponsorData.health.title}</strong>:{" "}
          {privacy.sponsorData.health.data}
        </li>
        <li>
          <strong>{privacy.sponsorData.media.title}</strong>:{" "}
          {privacy.sponsorData.media.data}
        </li>
      </ul>

      <h3>{privacy.speakerDataTitle}</h3>
      <ul>
        <li>
          <strong>{privacy.speakerData.identifiers.title}</strong>:{" "}
          {privacy.speakerData.identifiers.data}
        </li>
        <li>
          <strong>{privacy.speakerData.contact.title}</strong>:{" "}
          {privacy.speakerData.contact.data}
        </li>
        <li>
          <strong>{privacy.speakerData.professional.title}</strong>:{" "}
          {privacy.speakerData.professional.data}
        </li>
        <li>
          <strong>{privacy.speakerData.media.title}</strong>:{" "}
          {privacy.speakerData.media.data}
        </li>
      </ul>

      <h2>{privacy.purposeTitle}</h2>

      <h3>{privacy.purpose.attendee.title}</h3>
      <p>{privacy.purpose.attendee.text}</p>

      <h3>{privacy.purpose.sponsor.title}</h3>
      <p>{privacy.purpose.sponsor.text}</p>

      <h3>{privacy.purpose.speaker.title}</h3>
      <ol>
        <li>
          <strong>{privacy.purpose.speaker.item1.title}</strong>:{" "}
          {privacy.purpose.speaker.item1.text}
        </li>
        <li>
          <strong>{privacy.purpose.speaker.item2.title}</strong>:{" "}
          {privacy.purpose.speaker.item2.text}
        </li>
        <li>
          <strong>{privacy.purpose.speaker.item3.title}</strong>:{" "}
          {privacy.purpose.speaker.item3.text}
        </li>
      </ol>

      <h3>{privacy.purpose.media.title}</h3>
      <p>{privacy.purpose.media.text}</p>

      <h3>{privacy.purpose.allergies.title}</h3>
      <p>{privacy.purpose.allergies.text}</p>

      <h2>{privacy.legalBasisTitle}</h2>

      <h3>{privacy.legalBasis.attendees.title}</h3>
      <p>{privacy.legalBasis.attendees.p1}</p>
      <p>
        {privacy.legalBasis.attendees.p2.before}{" "}
        <a href="mailto:administracion@sysarmygalicia.com">
          administracion@sysarmygalicia.com
        </a>
        {privacy.legalBasis.attendees.p2.after}
      </p>

      <h3>{privacy.legalBasis.sponsors.title}</h3>
      <p>{privacy.legalBasis.sponsors.text}</p>

      <h3>{privacy.legalBasis.media.title}</h3>
      <p>{privacy.legalBasis.media.text}</p>

      <h3>{privacy.legalBasis.allergies.title}</h3>
      <p>{privacy.legalBasis.allergies.text}</p>

      <h2>{privacy.thirdPartiesTitle}</h2>
      <p>{privacy.thirdPartiesIntro}</p>
      <ul>
        <li>
          <strong>{privacy.thirdParties.publicAdmin.title}</strong>:{" "}
          {privacy.thirdParties.publicAdmin.text}
        </li>
        <li>
          <strong>{privacy.thirdParties.auditors.title}</strong>:{" "}
          {privacy.thirdParties.auditors.text}
        </li>
        <li>
          <strong>{privacy.thirdParties.lawEnforcement.title}</strong>:{" "}
          {privacy.thirdParties.lawEnforcement.text}
        </li>
        <li>
          <strong>{privacy.thirdParties.providers.title}</strong>:{" "}
          {privacy.thirdParties.providers.text}
        </li>
      </ul>

      <h2>{privacy.internationalTitle}</h2>
      <p>{privacy.internationalText}</p>

      <h2>{privacy.retentionTitle}</h2>
      <p>{privacy.retentionText}</p>

      <h2>{privacy.rightsTitle}</h2>
      <p>{privacy.rightsP1}</p>
      <p>{privacy.rightsP2}</p>
      <ul>
        <li>
          <strong>{privacy.rights.sysarmy.title}</strong>:{" "}
          {privacy.rights.sysarmy.text}
        </li>
        <li>
          <strong>{privacy.rights.aepd.title}</strong>:{" "}
          {privacy.rights.aepd.text}
        </li>
      </ul>

      <h2>{privacy.changesTitle}</h2>
      <p>{privacy.changesText}</p>

      <h2>{privacy.contactTitle}</h2>
      <p>{privacy.contactIntro}</p>
      <p>
        {privacy.contactEmail.before}{" "}
        <a href="mailto:administracion@sysarmygalicia.com">
          administracion@sysarmygalicia.com
        </a>
      </p>
      <p>
        <strong>{privacy.lastUpdate}</strong>
      </p>
    </div>
  );
}
