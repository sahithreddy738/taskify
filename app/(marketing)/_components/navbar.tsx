import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"


const Navbar = () => {
  return (
    <div className="fixed bg-white w-full h-14 flex items-center px-4">
       <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
           <Logo />
           <div className="flex justify-between w-full md:w-auto  md:space-x-4">
                <Button variant={"outline"} size="sm" asChild>
                   <Link href="/sign-in">Login</Link>
                </Button>
                <Button size="sm" asChild>
                    <Link href="/sign-up">Get Taskify for free</Link>
                </Button>
           </div>
       </div>
    </div>
  )
}

export default Navbar