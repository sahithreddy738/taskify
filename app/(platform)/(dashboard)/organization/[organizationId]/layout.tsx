import OrgControl from "../../_components/org-control"


const OrganizationIdLayout = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <div className="w-full">
        <OrgControl />
        {children}
    </div>
  )
}

export default OrganizationIdLayout