"use client";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useLocalStorage } from "usehooks-ts";
import { NavItem, OrganizationType } from "./nav-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const SideBar = ({ storageKey }: { storageKey: string }) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
    storageKey,
    {}
  );
  const { isLoaded: isLoadedOrgList, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const defaultAccordianValue = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );
  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading)
    return (
      <>
        <div className="flex items-center justify-between">
          <div className="w-[50%] h-10 mb-2">
            <Skeleton className="w-full h-10 mb-2" />
          </div>
          <Skeleton className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  const onExpand = (id: string) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !expanded[id] }));
  };
  return (
    <>
      <div className="font-medium flex items-center">
        <span className="pl-4">Workspaces</span>
        <Button
          className="ml-auto"
          asChild
          type="button"
          size={"icon"}
          variant={"ghost"}
        >
          <Link href={"/select-org"}>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordianValue}
        className="space-y-2"
      >
        {userMemberships.data?.map((mem) => (
          <NavItem
            key={mem.organization.id}
            onExpand={onExpand}
            organization={mem.organization as OrganizationType}
            isActive={activeOrganization?.id === mem.organization.id}
            isExpanded={expanded[mem.organization.id]}
          />
        ))}
      </Accordion>
    </>
  );
};

export default SideBar;
