"use client";

import { useEffect, useState } from "react";
import CardModel from "../modals/cardmodel";
import ProModal from "../modals/pro-modal";

const ModelProvider = () => {
  const [isMounted,setIsMounted]=useState(false);
  useEffect(()=>{
    setIsMounted(true);
  },[])
  if(!isMounted) return null;
    return (
    <>
      <CardModel/>
      <ProModal/>
    </>
  )
}

export default ModelProvider