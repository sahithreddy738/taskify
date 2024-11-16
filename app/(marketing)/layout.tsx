import { Poppins } from "next/font/google";
import Footer from "./_components/footer"
import Navbar from "./_components/navbar"
import { cn } from "@/lib/utils";
const poppinsFont = Poppins({
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    subsets:["latin"]
  });
  


const MarketingLayout = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <div className={cn("h-full bg-slate-100",poppinsFont.className)}>
      <Navbar />
      <main className="pt-40 pb-20">
         {children}
      </main>
   <Footer/>
    </div>
  )
}

export default MarketingLayout