
function Loading() {
  return (
    <div className='container'>
      
      <div className="w-full h-52 bg-gray-100 rounded-lg shadow-lg animate-pulse"/>
      <div className='flex flex-row gap-2 md:gap-4  w-fits overflow-x-auto hide-scrollbar '>
        {
          [1,2,3,4,5,6,7,8]?.map(it=>(
            <div key={it} className=" h-20 w-20 md:h-28 md:w-28 rounded-full bg-gray-100"/>
          ))
        }
      </div>
    </div>
  )
}

export default Loading