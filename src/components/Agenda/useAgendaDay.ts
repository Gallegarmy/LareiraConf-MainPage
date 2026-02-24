import { useState } from "react";

const CLOSE_ANIMATION_MS = 550;

export function useAgendaDay(initialOpen = true) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isClosing, setIsClosing] = useState(false);

  const toggle = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, CLOSE_ANIMATION_MS);
    } else {
      setIsOpen(true);
    }
  };

  return { isOpen, isClosing, toggle };
}
