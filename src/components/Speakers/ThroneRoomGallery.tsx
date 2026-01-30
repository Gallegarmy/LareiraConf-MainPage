import React, { useEffect, useState, useRef } from "react";
import { getSpeakersData } from "./speakers-data-i18n";
import type { Speaker } from "./speakers-types";
import PortraitFrame from "./PortraitFrame";
import SpeakerModal from "./SpeakerModal";
import gsap from "gsap";

interface ThroneRoomGalleryProps {
  lang: string;
}

const ThroneRoomGallery: React.FC<ThroneRoomGalleryProps> = ({ lang }) => {
  const speakers = getSpeakersData(lang as "es" | "gl");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotations, setRotations] = useState<number[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Generar rotaciones aleatorias solo en el cliente
  useEffect(() => {
    const newRotations = speakers.map(() => {
      const shouldRotate = Math.random() > 0.4;
      return shouldRotate ? Math.random() * 4 - 2 : 0;
    });
    setRotations(newRotations);
  }, [speakers.length]);

  useEffect(() => {
    if (!galleryRef.current) return;

    const frames = galleryRef.current.querySelectorAll(".portrait-frame");

    gsap.from(frames, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "back.out(1.5)",
    });
  }, []);

  const handleOpenModal = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSpeaker(null), 300);
  };

  return (
    <>
      <div className="throne-room-gallery" ref={galleryRef}>
        {speakers.map((speaker, index) => (
          <PortraitFrame
            key={speaker.id}
            speaker={speaker}
            rotation={rotations[index] || 0}
            onClick={() => handleOpenModal(speaker)}
          />
        ))}
      </div>

      <SpeakerModal
        speaker={selectedSpeaker}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ThroneRoomGallery;
