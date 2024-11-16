import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileNavBar from "./mobile-nav";

const NavBar = () => {

  return (
    <nav className="fixed top-0 bg-white border-b shadow-sm w-full h-14 p-4 flex items-center">
       <MobileNavBar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button size={"sm"} className="hidden md:block">
          Create
        </Button>
        <Button className="md:hidden flex" size={"sm"}>
          <Plus className="h-6 w-6" />
        </Button>
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
