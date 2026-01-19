import React from "react";

const SpeakersBookPreview: React.FC = () => (
  <div className="speakers-preview-embed">
    <iframe
      title="Demostración interactiva del libro de ponentes"
      src="/speakers-book-preview"
      loading="lazy"
      allow="fullscreen"
    />
  </div>
);

export default SpeakersBookPreview;
