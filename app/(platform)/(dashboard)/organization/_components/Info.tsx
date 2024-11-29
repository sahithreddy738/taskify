"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface InfoProps {
  isPro: boolean;
}

const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skelton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      {organization?.imageUrl ? (
        <Image
          width={60}
          height={60}
          src={organization.imageUrl}
          alt="organization-image"
          className="rounded-sm object-cover"
        />
      ) : (
        <Skeleton className="h-14 w-14 rounded-sm" />
      )}
      <div className="flex flex-col space-y-1 items-start">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center gap-x-2 text-muted-foreground">
          <CreditCard className="w-4 h-4" />
          <p className=" text-sm">{isPro ? "Pro" : "Free"}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.Skelton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <Skeleton className="h-14 w-14 rounded-sm" />
      <div className="flex flex-col space-y-2 items-start">
        <Skeleton className="w-[200px] h-5" />
        <div className="flex items-center gap-x-2 text-muted-foreground">
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
