import SideBar from '../../components/global/SideBar'

export default function RootLayout({ children }) {


  return (

    <div className="flex flex-row container ">
      <div className="py-4 w-12 md:w-56 flex flex-col bg-gray-100 text-sm text-gray-500">
        <SideBar/>
      </div>
      <div className="p-4 bg-white w-full">
        {children}
      </div>
    </div>

  )
}

