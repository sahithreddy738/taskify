"use client"
import { useOrganizationList } from '@clerk/nextjs'
import { useParams} from 'next/navigation'
import  { useEffect } from 'react'

const OrgControl = () => {
    const {organizationId}=useParams();
    const {setActive}=useOrganizationList();

    useEffect(()=>{
        if(!setActive) return;
       setActive({organization:organizationId as string })
    },[setActive,organizationId])
    return null
}

export default OrgControl;