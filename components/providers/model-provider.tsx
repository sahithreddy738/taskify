"use client";

import { useEffect, useState } from "react";
import CardModel from "../modals/cardmodel";

const ModelProvider = () => {
  const [isMounted,setIsMounted]=useState(false);
  useEffect(()=>{
    setIsMounted(true);
  },[])
  if(!isMounted) return null;
    return (
    <>
      <CardModel/>
    </>
  )
}

export default ModelProvider