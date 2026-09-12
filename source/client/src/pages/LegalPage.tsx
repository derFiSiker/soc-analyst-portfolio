type LegalPageProps = {
  type: "impressum" | "datenschutz";
};

export default function LegalPage({ type }: LegalPageProps) {
  const isPrivacy = type === "datenschutz";

  return (
    <main className="legal-page">
      <div className="legal-page-inner">
        <a className="legal-back" href="/">
          ← Zurück zur Startseite
        </a>

        <p className="legal-eyebrow">
          MARCO LÜTKEMÜLLER / PERSÖNLICHES PORTFOLIO
        </p>

        <h1>{isPrivacy ? "Datenschutzerklärung" : "Impressum"}</h1>

        {isPrivacy ? <PrivacyContent /> : <ImprintContent />}

        <div className="legal-footer-links">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutzerklärung</a>
        </div>
      </div>
    </main>
  );
}

function ImprintContent() {
  return (
    <>
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          Marco Lütkemüller
          <br />
          Straßburgerstr. 55
          <br />
          47137 Duisburg
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: Marco@derfisiker.de
        </p>
      </section>

      <section>
        <h2>Art und Zweck der Website</h2>
        <p>
          Diese Website ist ein persönliches Portfolio zur Darstellung meiner
          beruflichen Weiterbildung, meiner praktischen Projekte und meiner
          Kenntnisse im Bereich IT-Systemintegration und Security Operations.
        </p>
        <p>
          Die Website dient insbesondere der Information potenzieller
          Arbeitgeber und der Darstellung meiner fachlichen Entwicklung.
          Über diese Website werden keine IT-Dienstleistungen angeboten.
        </p>
      </section>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Marco Lütkemüller
          <br />
          Straßburgerstr. 55
          <br />
          47137 Duisburg
        </p>
        <p>
          E-Mail: Marco@derfisiker.de
        </p>
      </section>

      <section>
        <h2>2. Hosting</h2>
        <p>
          Diese Website wird bei IONOS gehostet. Beim Aufruf der Website können
          technische Zugriffsdaten verarbeitet werden, die für die
          Bereitstellung und den sicheren Betrieb der Website erforderlich
          sind.
        </p>
        <p>
          Dazu können insbesondere IP-Adresse, Zeitpunkt des Zugriffs,
          angeforderte Ressourcen und technische Informationen zum verwendeten
          Browser gehören.
        </p>
      </section>

      <section>
        <h2>3. Kontaktformular</h2>
        <p>
          Auf dieser Website steht ein Kontaktformular zur Verfügung. Die
          Übermittlung erfolgt über den Dienst Formspree.
        </p>
        <p>
          Bei einer Nachricht können folgende Daten verarbeitet werden:
        </p>
        <ul>
          <li>Name</li>
          <li>E-Mail-Adresse</li>
          <li>Nachrichteninhalt</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt zur Bearbeitung und Beantwortung deiner
          Anfrage.
        </p>
      </section>

      <section>
        <h2>4. Formspree</h2>
        <p>
          Für die Verarbeitung der Kontaktformular-Daten wird Formspree
          verwendet. Die Daten werden an Formspree übermittelt und dort
          entsprechend der Einstellungen des verwendeten Kontos verarbeitet.
        </p>
        <p>
          Weitere Informationen findest du in der
          <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noreferrer">
            Datenschutzerklärung von Formspree
          </a>.
        </p>
      </section>

      <section>
        <h2>5. IONOS WebAnalytics</h2>
        <p>
          Soweit IONOS WebAnalytics auf dieser Website aktiviert ist, können
          technische Zugriffsdaten zur statistischen Auswertung der
          Website-Nutzung verarbeitet werden.
        </p>
        <p>
          Die konkrete Konfiguration und der Umfang der Verarbeitung richten
          sich nach den bei IONOS aktivierten Einstellungen.
        </p>
      </section>

      <section>
        <h2>6. Deine Rechte</h2>
        <p>
          Du hast im Rahmen der gesetzlichen Vorschriften insbesondere das
          Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung und Widerspruch gegen bestimmte Verarbeitungen.
        </p>
        <p>
          Zur Ausübung deiner Rechte kannst du dich an die oben genannte
          Kontaktadresse wenden.
        </p>
      </section>

      <section>
        <h2>7. Aktualität</h2>
        <p>
          Diese Datenschutzerklärung wird angepasst, wenn sich die technischen
          Funktionen oder die eingesetzten Dienste dieser Website ändern.
        </p>
      </section>
    </>
  );
}