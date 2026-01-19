import React from "react";

type SpeakersNavigationProps = {
  currentSpreadIndex: number;
  totalSpreads: number;
  canGoToPrevious: boolean;
  canGoToNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

const SpeakersNavigation: React.FC<SpeakersNavigationProps> = ({
  currentSpreadIndex,
  totalSpreads,
  canGoToPrevious,
  canGoToNext,
  onPrevious,
  onNext,
  onSelect,
}) => {
  if (totalSpreads <= 1) {
    return null;
  }

  return (
    <nav className="speakers-navigation" aria-label="Paginación de ponentes">
      <button
        type="button"
        className="speakers-navigation__control"
        onClick={onPrevious}
        disabled={!canGoToPrevious}
      >
        Página anterior
      </button>

      <div className="speakers-navigation__status" aria-live="polite">
        Página {currentSpreadIndex + 1} de {totalSpreads}
      </div>

      <div className="speakers-navigation__pages" role="radiogroup">
        {Array.from({ length: totalSpreads }).map((_, index) => {
          const isActive = index === currentSpreadIndex;
          return (
            <button
              key={`speakers-page-${index}`}
              type="button"
              className={`speakers-navigation__page${
                isActive ? "is-active" : ""
              }`}
              onClick={() => onSelect(index)}
              aria-label={`Ir a la página ${index + 1}`}
              role="radio"
              aria-checked={isActive}
            >
              <span aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="speakers-navigation__control"
        onClick={onNext}
        disabled={!canGoToNext}
      >
        Página siguiente
      </button>
    </nav>
  );
};

export default SpeakersNavigation;
