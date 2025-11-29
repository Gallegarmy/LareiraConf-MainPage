import React, { useCallback } from "react";
import FireParticles from "@components/Others/FireParticles";

import campBackdrop from "@img/parallax/team-camp.png";
import "@styles/team.css";

import TeamCopy from "./TeamCopy";
import TeamMembers from "./TeamMembers";
import TeamPagination from "./TeamPagination";
import { teamMembers } from "./team-members";
import { useTeamCarousel } from "./hooks/useTeamCarousel";

const TeamSection: React.FC = () => {
  const {
    activeMemberId,
    isMobileView,
    registerCard,
    activateMember,
    deactivateMember,
    toggleMember,
    scrollToMember,
  } = useTeamCarousel(teamMembers);

  const handleSelectMember = useCallback(
    (memberId: string) => {
      scrollToMember(memberId);
      activateMember(memberId);
    },
    [activateMember, scrollToMember],
  );

  return (
    <section id="team" className="panel team-section">
      <div className="team-parallax" aria-hidden="true">
        <img
          src={campBackdrop.src}
          alt="Campamento nocturno iluminado por una hoguera"
          className="team-parallax-img team-backdrop-img"
        />
        <div className="team-gradient" />
        <div className="team-particles">
          <FireParticles count={85} />
        </div>
      </div>

      <div className="team-content">
        <TeamCopy />

        <TeamMembers
          members={teamMembers}
          activeMemberId={activeMemberId}
          isMobileView={isMobileView}
          registerCard={registerCard}
          onActivate={activateMember}
          onDeactivate={deactivateMember}
          onToggle={toggleMember}
        />

        <TeamPagination
          members={teamMembers}
          activeMemberId={activeMemberId}
          isMobileView={isMobileView}
          onSelect={handleSelectMember}
        />
      </div>
    </section>
  );
};

export default TeamSection;
