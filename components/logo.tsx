import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="md:flex hidden gap-x-2 hover:opacity-75 items-center">
        <Image src="/logo.svg" alt="logo" width={30} height={30}></Image>
        <p className={cn("text-lg text-neutral-700 font-semibold", poppinsFont.className)}>
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
