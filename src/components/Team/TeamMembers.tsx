import React from "react";
import type { TeamMember } from "./team-types";
import TeamMemberCard from "./TeamMemberCard";

type TeamMembersProps = {
  members: TeamMember[];
  activeMemberId: string | null;
  isMobileView: boolean;
  registerCard: (memberId: string) => (node: HTMLElement | null) => void;
  onActivate: (memberId: string) => void;
  onDeactivate: (memberId: string) => void;
  onToggle: (memberId: string) => void;
};

const TeamMembers: React.FC<TeamMembersProps> = ({
  members,
  activeMemberId,
  isMobileView,
  registerCard,
  onActivate,
  onDeactivate,
  onToggle,
}) => (
  <div className="team-characters">
    {members.map((member) => (
      <TeamMemberCard
        key={member.id}
        member={member}
        isActive={activeMemberId === member.id}
        isMobileView={isMobileView}
        registerCard={registerCard}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
        onToggle={onToggle}
      />
    ))}
  </div>
);

export default TeamMembers;
