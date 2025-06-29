'use client'
import { MenuOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Menu, Modal } from "antd"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { userNavTab } from "../../utility/userTabNav"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserSession from "../user/userSessions"

function SideBar() {
  const [popup, setPopup] = useState(false)
  const routerPath = usePathname()
  const route = useRouter()


  const user = useSelector(state => state.user)
  useEffect(() => {
    !user.userId ? setPopup(true) : setPopup(false)
  }, [user])

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div>




      <Modal open={popup} onCancel={() => route.push('/')} footer={false}><UserSession Close={() => route.push('/user')} /></Modal>
      <div>

        <div className="md:flex flex-col justify-center items-center mb-4 hidden">
          <Avatar size={40} icon={<UserOutlined />} />
          Hi, {user?.userName}
        </div>
        {
          userNavTab?.map((tab, idx) =>
            <Link key={idx} className={`
            ${tab?.url === routerPath && "border-secondary border-l-2 p-2 text-gray-800 bg-gray-200 "}
            hover:border-secondary 
            hover:border-l-2 p-2 
            hover:text-gray-800 
            hover:bg-gray-200 
            flex gap-2 items-center`
            } href={tab?.url}><div className="text-xl">{tab?.icon}</div> <div className="hidden md:block">{tab?.label}</div></Link>
          )
        }
      </div>

    </div>
  );
}

export default SideBar;
