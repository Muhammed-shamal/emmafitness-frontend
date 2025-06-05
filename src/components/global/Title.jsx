import Link from 'next/link'
import React from 'react'

function Title({titlePart1, titlePart2, viewAllUrl="/", type="big"}) {
  return (
    <div className='flex justify-center items-center p-2 bg-gray-200 relative mb-2'>
    <h2 className={`font-bold ${type=='big' ? 'md:text-2xl h-5 md:h-7' : 'h-5'}  uppercase `}>
    <span className='text-secondary'>{titlePart1} </span>{titlePart2}
    </h2>
    {
      viewAllUrl != "/" &&
    <Link href={viewAllUrl} className="text-blue-500 font-bold text-sm absolute right-6">View All</Link>
    }
    </div>

  )
}

export default Title