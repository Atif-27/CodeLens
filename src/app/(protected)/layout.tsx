import { UserButton } from "@clerk/nextjs";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
// import { AppSidebar } from "./app-sidebar";
// import { ModeToggle } from "../components/ThemeToggle";

type Props = {
  children: React.ReactNode;
};
const userButtonAppearance = {
  elements: {
    userButtonAvatarBox: "w-9 h-9", // Custom width and height
    userButtonPopoverCard: "w-auto", // Custom background for the popover card
    //   userButtonPopoverActionButton: "text-blue-400", // Custom text color for action buttons
  },
};
const SideBarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2 w-full">
        <div className="border-sidebar-border bg-sidebar flex items-center gap-2 rounded-md border p-2 px-4 shadow">
          <SidebarTrigger />
          {/* <SearchBar/> */}
          <div className="ml-auto"></div>
          {/* <ModeToggle /> */}
          <UserButton appearance={userButtonAppearance} />
        </div>
        <div className="h-4"></div>
        {/* main content */}
        <div className="border-sidebar-border bg-sidebar h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SideBarLayout;
