import SideBar from "../_components/sidebar"


const OrganizationLayout = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <main className="pt-20 md:pt-24 max-w-6xl 2xl:max-w-screen-xl mx-auto">
       <div className="flex gap-x-7">
         <div className="hidden md:block shrink-0 w-64">
         <SideBar storageKey="desktop-sidebar"/>
         </div>
       {children}
       </div>
    </main>
  )
}

export default OrganizationLayout