"use client";

import React from "react";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MAX_VISIBLE_MEMBERS = 4;

function TeamMembers() {
  const { projectId } = useProject();
  const { data: teamMembers } = api.project.getTeamMembers.useQuery({
    projectId,
  });

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  const visibleMembers = teamMembers.slice(0, MAX_VISIBLE_MEMBERS);
  const remainingCount = Math.max(0, teamMembers.length - visibleMembers.length);

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-1">
        {visibleMembers.map((member) => (
          <Avatar
            key={member.id}
            className="h-6 w-6 sm:h-8 sm:w-8 border border-border bg-background"
          >
            <AvatarImage src={member.user.imageUrl ?? ""} />
            <AvatarFallback className="text-[10px] sm:text-[12px]">
              {member.user.firstName?.charAt(0) ??
                member.user.emailAddress?.charAt(0) ??
                "?"}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-[11px] sm:text-xs px-2 py-1"
            aria-label={`View all ${teamMembers.length} members`}
          >
            {remainingCount > 0 ? `+${remainingCount} more` : "Members"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <p className="text-xs text-muted-foreground mb-3">
            Team members ({teamMembers.length})
          </p>
          <div className="flex max-h-56 flex-col gap-3 pr-1 overflow-y-auto">
            {teamMembers.map((member) => {
              const fullName = `${member.user.firstName ?? ""} ${member.user.lastName ?? ""}`.trim();
              return (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-7 w-7 border border-border bg-background">
                    <AvatarImage src={member.user.imageUrl ?? ""} />
                    <AvatarFallback className="text-xs">
                      {member.user.firstName?.charAt(0) ??
                        member.user.emailAddress?.charAt(0) ??
                        "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 text-sm">
                    <span className="font-medium leading-none">
                      {fullName || member.user.emailAddress || "Unknown member"}
                    </span>
                    {member.user.emailAddress ? (
                      <span className="text-xs text-muted-foreground">
                        {member.user.emailAddress}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default TeamMembers;