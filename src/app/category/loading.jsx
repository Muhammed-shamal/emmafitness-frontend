
function Loading() {
    return (
        <div className='container flex flex-row gap-4 my-4'>
            <div className='border-r h-screen bg-gray-100 w-32 animate-pulse' />

            <div>

                <div className='flex flex-row gap-2 md:gap-4  w-fits overflow-x-auto hide-scrollbar '>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8]?.map(it => (
                            <div key={it} className=" h-20 w-20 md:h-28 md:w-28 rounded-full bg-gray-100 animate-pulse" />
                        ))
                    }
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                    {
                        [1, 2, 3, 4, 5]?.map((product, idx) =>
                            <div key={idx} className="w-full h-40 bg-gray-100 animate-pulse" />
                        )
                    }
                </div>
            </div>


        </div>

    )
}

export default Loading