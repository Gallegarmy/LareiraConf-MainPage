import React from "react";
import "./LanguageSelector.scss";

interface LanguageSelectorProps {
  currentLang: "es" | "gl";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang }) => {
  const handleLanguageChange = (lang: "es" | "gl") => {
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(es|gl)/, "");
    const newPath =
      lang === "es" ? pathWithoutLang || "/" : `/gl${pathWithoutLang || "/"}`;
    window.location.href = newPath;
  };

  return (
    <div className="language-selector">
      <button
        className={`lang-button ${currentLang === "es" ? "active" : ""}`}
        onClick={() => handleLanguageChange("es")}
        aria-label="Español"
      >
        ES
      </button>
      <span className="lang-separator">/</span>
      <button
        className={`lang-button ${currentLang === "gl" ? "active" : ""}`}
        onClick={() => handleLanguageChange("gl")}
        aria-label="Galego"
      >
        GL
      </button>
    </div>
  );
};

export default LanguageSelector;
