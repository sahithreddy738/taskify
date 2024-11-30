import { auth } from "@clerk/nextjs/server"
import OrgControl from "../../_components/org-control"
import { startCase } from "lodash";



export async function generateMetadata() {
  const {orgSlug}=await auth();
  return {
    title:startCase(orgSlug || "organization")
  }
}

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