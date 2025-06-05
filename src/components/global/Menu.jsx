import { AppstoreOutlined, DesktopOutlined, GoldOutlined, LaptopOutlined, UngroupOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import fetchApi from '../../utility/api/fetchApi'
import Image from 'next/image';




async function NavMenu() {


  const getIconComponent = (icon) => {
    // switch(icon){
    //   case 'AppStore' : return <AppstoreOutlined/>
    //   case 'Desktop' : return <DesktopOutlined/>
    //   case 'Gold' : return <GoldOutlined/>
    //   case 'Laptop' : return <LaptopOutlined/>
    //   case 'Group' : return <UngroupOutlined/>
    //   default : return ""
    // }
    if (!icon?.data?.attributes?.url) return ''
    return <Image alt='menu icon' className='invert' src={icon?.data?.attributes?.url} width={15} height={15} />
  }



  const [res, label] = await Promise.all([
    fetchApi({ URI: `menus?filters[Type][$eq]=Main&populate=*&sort[createdAt]=asc` }),
    fetchApi({ URI: `custom-labels` })
  ])


  const menuFiltered = (array = []) => (
    array.map(arr => (
      {
        key: arr?.id,
        label: <Link href={arr?.attributes?.Link || "#"}>{arr?.attributes?.Label}</Link>,
        icon: getIconComponent(arr?.attributes?.Icon_PNG),
        ...(arr?.attributes?.menus?.data?.length > 0 ? { children: menuFiltered(arr?.attributes?.menus?.data) } : [])
      }
    ))
  )

  const menu = menuFiltered(res?.data)







  return (
    <div className=" bg-primary text-white   items-center shadow-md max-h-10 overflow-hidden ">
      <div className='container flex'>

        <Link href={`/products/${label?.data?.[0]?.attributes?.slug}`} className='bg-yellow-400 h-10 flex content-center  whitespace-nowrap  items-center pt-1 px-4 text-black text-sm'>{label?.data?.[0]?.attributes?.Name}</Link>
        <Menu selectedKeys={['app']} mode="horizontal" className=' text-white bg-primary items-center md:flex-1 ' style={{ lineHeight: 2.7 }} items={menu} />
      </div>

    </div>
  )
}

export default NavMenu



