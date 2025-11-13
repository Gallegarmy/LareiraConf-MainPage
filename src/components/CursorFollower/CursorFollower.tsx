import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./CursorFollower.scss";

const CursorFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const moveContainer = (e: MouseEvent) => {
      xTo(e.clientX + 15);
      yTo(e.clientY + 15);
    };

    window.addEventListener("mousemove", moveContainer);

    return () => {
      window.removeEventListener("mousemove", moveContainer);
    };
  }, []);

  return (
    <div ref={followerRef} className="cursor-follower">
      <img src="/assets/lumi.png" alt="Cursor" />
    </div>
  );
};

export default CursorFollower;
