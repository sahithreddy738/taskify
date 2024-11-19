import NavBar from "./_components/navbar"


const DashBoardLayout = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <div className="flex h-full flex-col">
        <NavBar/>
        {children}
    </div>
  )
}

export default DashBoardLayout