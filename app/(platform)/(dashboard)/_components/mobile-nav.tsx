"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useMobileSideBar } from "@/hooks/nav-open";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "./sidebar";

const MobileNavBar = () => {
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  const isOpen = useMobileSideBar((state) => state.isOpen);
  const onOpen = useMobileSideBar((state) => state.onOpen);
  const onClose = useMobileSideBar((state) => state.onClose);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    onClose();
  }, [pathName, onClose]);

  if (!mounted) return null;

  return (
    <>
      <Button variant="ghost" size="sm" onClick={onOpen}>
        <Menu className="h-4 w-4 mr-2" />
      </Button>

      <Sheet
        open={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
      >
        <SheetContent side="left" className="pt-16 p-2">
          <SheetTitle>Menu</SheetTitle>
          <SideBar storageKey="mobile-sidebar" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavBar;
