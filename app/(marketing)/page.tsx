import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppinsFont = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets:["latin"]
});

const MarketingPage = () => {
  return (
    <div className={cn("flex gap-4 items-center flex-col justify-center",poppinsFont.className)
    }>
      <div className="flex items-center flex-col justify-center">
        <div className="mb-4 flex gap-2 items-center text-md bg-amber-200 p-5 rounded-full uppercase border shadow-sm font-semibold">
          <Medal />
          No 1 Task Management
        </div>
        <h1 className="mb-4 text-3xl md:text-6xl text-center text-neutral-800">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-500 to-pink-600 px-4 py-2 rounded-md text-white">
          Work Forward
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mx-auto max-w-xs md:max-w-2xl text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
        officiis facere exercitationem fugit dolorem voluptates deserunt maxime
        necessitatibus nam soluta quos voluptatum, doloribus vel ea asperiores
        ducimus dolore error labore!
      </div>
      <Button >
          <Link href="/sign-up">Get Taskify for Free</Link>
         </Button>
    </div>
  );
};

export default MarketingPage;
