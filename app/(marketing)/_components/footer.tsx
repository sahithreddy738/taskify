import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"



const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-slate-100 flex items-center p-4">
    <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
        <Logo/>
        <div className="flex justify-between w-full md:w-auto   md:space-x-4">
             <Button variant="ghost" size="sm" >
                   Privacy Policy
             </Button>
             <Button size="sm" variant={"ghost"}>
                 Terms & Conditions
             </Button>
        </div>
    </div>
 </div>
  )
}

export default Footer