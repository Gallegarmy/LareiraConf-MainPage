import { useState, useEffect } from "react";
import "@styles/voting.css";

const LS_KEY = "lc26_voter_email";

interface Candidate {
  id: string;
  name: string;
  logo: string;
}

interface PortadorCandidate {
  id: string;
  name: string;
  photo: string;
  photo2?: string;
}

interface VotingFormProps {
  gremioCandidates: Candidate[];
  artesanoCandidates: Candidate[];
  portadorCandidates: PortadorCandidate[];
  lumiSrc: string;
}

const VotingForm = (props: VotingFormProps): ReactNode => {
  const { gremioCandidates, artesanoCandidates, portadorCandidates, lumiSrc } = props;

  const [step, setStep] = useState<"email" | "voting" | "success">("email");
  const [email, setEmail] = useState("");
  const [gremio, setGremio] = useState("");
  const [artesano, setArtesano] = useState("");
  const [portador, setPortador] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return;
    setEmail(saved);
    setLoading(true);
    fetch("/api/validate-voter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: saved }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.eligible) {
          if (data.alreadyVoted && data.previousVotes) {
            setGremio(data.previousVotes.gremio);
            setArtesano(data.previousVotes.artesano);
            setPortador(data.previousVotes.portador);
          }
          setStep(data.alreadyVoted ? "success" : "voting");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function logout() {
    localStorage.removeItem(LS_KEY);
    setEmail("");
    setGremio("");
    setArtesano("");
    setPortador("");
    setError(null);
    setStep("email");
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/validate-voter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.eligible) {
        localStorage.setItem(LS_KEY, email);
        setStep("voting");
      } else {
        if (data.reason === "not_registered") {
          setError("Este email no está en nuestra lista de asistentes. Comprueba que es el mismo con el que compraste la entrada.");
        } else {
          setError("No hemos podido validar tu email. Inténtalo de nuevo.");
        }
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gremio || !artesano || !portador) {
      setError("Debes votar en todas las categorías.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/submit-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, gremio, artesano, portador }),
      });
      const data = await res.json();
      if (data.ok) {
        setStep("success");
      } else {
        setError("Error al registrar el voto. Inténtalo de nuevo.");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "success") {
    return (
      <div className="voting-success">
        <img src={lumiSrc} alt="Lumi" className="voting-success__lumi" />
        <h2 className="voting-success__title">¡Voto registrado!</h2>
        <p className="voting-success__desc">
          Los ganadores se anunciarán al final del evento.
        </p>
        {gremio && artesano && portador ? (
          <div className="voting-success__recap">
            <div className="recap-item">
              <span className="recap-label">Mejor puesto del Gremio</span>
              <span className="recap-value">{gremio}</span>
            </div>
            <div className="recap-item">
              <span className="recap-label">Mejor puesto Artesano</span>
              <span className="recap-value">{artesano}</span>
            </div>
            <div className="recap-item">
              <span className="recap-label">Mejor portador de la llama</span>
              <span className="recap-value">{portador}</span>
            </div>
          </div>
        ) : null}
        <button className="vf-btn-secondary" onClick={() => setStep("voting")}>
          Cambiar votos
        </button>
      </div>
    );
  }

  if (loading && step === "email") {
    return <p className="voting-step__hint">Cargando...</p>;
  }

  if (step === "email") {
    return (
      <div className="voting-email-step">
        <p className="voting-step__hint">
          Usa el email con el que compraste la entrada
        </p>
        <form onSubmit={handleEmailSubmit} className="email-form">
          <div className="email-form__row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="vf-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="vf-btn-primary"
              disabled={loading || !email}
            >
              {loading ? "..." : "Acceder"}
            </button>
          </div>
          {error && <p className="voting-error">{error}</p>}
        </form>
        <p className="voting-step__help">
          ¿No recuerdas el email o te la compró otra persona? Acércate al stand de LareiraConf y te incluimos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleVoteSubmit} className="vote-form">

      <fieldset className="vote-fieldset">
        <legend className="vote-legend">
          <span className="vote-legend__num">01</span>
          Mejor puesto del Gremio
        </legend>
        <p className="vote-fieldset__desc">
          ¿Qué comunidad ha tenido el mejor puesto? Valora la originalidad, la decoración y la dinámica.
        </p>
        <div className="vote-candidates">
          {gremioCandidates.map((c) => (
            <label
              key={c.id}
              className={`candidate-card${gremio === c.name ? " candidate-card--selected" : ""}`}
            >
              <input
                type="radio"
                name="gremio"
                value={c.name}
                checked={gremio === c.name}
                onChange={() => setGremio(c.name)}
                className="candidate-radio"
              />
              <img src={c.logo} alt={c.name} className="candidate-card__logo" />
              <span className="candidate-card__name">{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="vote-fieldset">
        <legend className="vote-legend">
          <span className="vote-legend__num">02</span>
          Mejor puesto Artesano
        </legend>
        <p className="vote-fieldset__desc">
          ¿Qué patrocinador ha tenido el mejor stand? Valora el stand, el merch y la conversación.
        </p>
        <div className="vote-candidates vote-candidates--sponsors">
          {artesanoCandidates.map((c) => (
            <label
              key={c.id}
              className={`candidate-card${artesano === c.name ? " candidate-card--selected" : ""}`}
            >
              <input
                type="radio"
                name="artesano"
                value={c.name}
                checked={artesano === c.name}
                onChange={() => setArtesano(c.name)}
                className="candidate-radio"
              />
              <img
                src={c.logo}
                alt={c.name}
                className="candidate-card__logo candidate-card__logo--sponsor"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="vote-fieldset">
        <legend className="vote-legend">
          <span className="vote-legend__num">03</span>
          Mejor portador de la llama
        </legend>
        <p className="vote-fieldset__desc">
          ¿Qué ponente ha encendido más la Lareira?
        </p>
        <div className="vote-candidates vote-candidates--portador">
          {portadorCandidates.map((c) => (
            <label
              key={c.id}
              className={`candidate-card candidate-card--speaker${c.photo2 ? " candidate-card--duo" : ""}${portador === c.name ? " candidate-card--selected" : ""}`}
            >
              <input
                type="radio"
                name="portador"
                value={c.name}
                checked={portador === c.name}
                onChange={() => setPortador(c.name)}
                className="candidate-radio"
              />
              <div className={c.photo2 ? "candidate-card__photos" : ""}>
                <img src={c.photo} alt={c.name} className="candidate-card__photo" />
                {c.photo2 && <img src={c.photo2} alt={c.name} className="candidate-card__photo" />}
              </div>
              <span className="candidate-card__name">{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p className="voting-error">{error}</p>}

      <button
        type="submit"
        className="vf-btn-primary vf-btn-primary--large"
        disabled={loading || !gremio || !artesano || !portador}
      >
        {loading ? "Enviando..." : "Enviar votos"}
      </button>

      <div className="voter-session">
        <span className="voter-session__email">{email}</span>
        <button type="button" className="voter-session__logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </form>
  );
};

export default VotingForm;
