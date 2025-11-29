import React from "react";
import type { TeamMember } from "./team-types";

type TeamPaginationProps = {
  members: TeamMember[];
  activeMemberId: string | null;
  isMobileView: boolean;
  onSelect: (memberId: string) => void;
};

const TeamPagination: React.FC<TeamPaginationProps> = ({
  members,
  activeMemberId,
  isMobileView,
  onSelect,
}) => {
  if (!isMobileView) {
    return null;
  }

  return (
    <nav className="team-pagination" aria-label="Miembros del equipo">
      {members.map((member, index) => {
        const isActive = activeMemberId
          ? activeMemberId === member.id
          : index === 0;
        const buttonClasses = ["team-pagination__button"];

        if (isActive) {
          buttonClasses.push("is-active");
        }

        return (
          <button
            key={member.id}
            type="button"
            className={buttonClasses.join(" ")}
            aria-label={`Ver a ${member.name}`}
            aria-pressed={isActive}
            onClick={() => onSelect(member.id)}
          >
            <span className="team-pagination__dot" aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
};

export default TeamPagination;
