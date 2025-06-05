'use client'

import { Pagination } from "antd"
import { useEffect, useState } from "react"


function PaginationButton({meta, setPagination, reload}) {
  
const [element, setElement] = useState()

    const handlePagination = (pageNo) => {
        setPagination(prv => ({ ...prv, pageNo }))
        reload(rl => !rl)
        window.scrollTo({ top: 0, behavior: "smooth" });
    
      }
useEffect(()=>{
    setPagination(prv => ({ ...prv, pageCount: meta?.pagination?.pageCount, }))
    if(meta?.pagination?.pageCount > 1)
  setElement(<Pagination onChange={handlePagination} responsive={true} pageSize={meta?.pagination?.pageSize} showSizeChanger={false} total={meta?.pagination?.total} />)
},[meta])    

  return (
    <div className="flex flex-row justify-end mt-2 md:mt-4">

    {element}
    {/*  */}
  </div>
  )
}

export default PaginationButton