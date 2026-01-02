import React, { useEffect, useState, useRef } from "react";
import { speakers } from "./speakers-data";
import type { Speaker } from "./speakers-types";
import PortraitFrame from "./PortraitFrame";
import SpeakerModal from "./SpeakerModal";
import gsap from "gsap";

const ThroneRoomGallery: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Generar rotaciones aleatorias para cada speaker (entre -3 y 3 grados)
  const rotations = speakers.map(() => Math.random() * 6 - 3);

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
            rotation={rotations[index]}
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
