import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileNavBar from "./mobile-nav";
import FormPopover from "@/components/form/form-popover";

const NavBar = () => {
  return (
    <nav className="fixed top-0 bg-white border-b shadow-sm w-full h-14 p-4 flex items-center z-10">
      <MobileNavBar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover side="bottom" sideOffset={18} align="center">
          <Button size={"sm"} className="hidden md:block">
            Create
          </Button>
        </FormPopover>
        <FormPopover side="bottom" sideOffset={18} align="center">
          <Button className="md:hidden flex" size={"sm"}>
            <Plus className="h-6 w-6" />
          </Button>
        </FormPopover>
      </div>
      <div className="flex items-center gap-x-2 ml-auto">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
        />
        <UserButton
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
