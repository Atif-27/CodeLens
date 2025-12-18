"use client";
import useProject from "@/hooks/use-project";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import{ Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const InviteButton = () => {
  const {projectId} = useProject(); 
  const [isOpen, setIsOpen] = React.useState(false);
  const [inviteUrl, setInviteUrl] = React.useState("");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setInviteUrl(`${window.location.origin}/join/${projectId}`);
    }
  }, [projectId]);
  const handleCopyToClipboard = () => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(inviteUrl);
      toast.success("Copied to clipboard");
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Invite Team Members</DialogTitle>
            <p className="text-xs sm:text-sm text-gray-500">
              Ask them to copy and paste this link into their browser to join
              the project.
            </p>
            <Input
              className="mt-4 text-xs sm:text-sm"
              readOnly
              onClick={handleCopyToClipboard}
              value={inviteUrl}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm" className="text-xs sm:text-sm">
        <span className="hidden sm:inline">Invite Members</span>
        <span className="sm:hidden">Invite</span>
      </Button>
    </>
  );
}

export default InviteButton;
