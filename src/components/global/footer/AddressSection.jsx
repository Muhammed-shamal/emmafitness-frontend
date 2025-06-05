import { MailOutlined, PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons"
import basicDatas from '../../../utility/basicDatas'
import Image from "next/image"

function AddressSection() {
  return (
    <div className="bg-secondary text-white">
      <div className="flex flex-row justify-center md:justify-between  flex-wrap container py-2 gap-1 items-center">

        <div className="flex flex-col text-center md:text-left">
          <span className="font-bold">We&apos;re Always Here To Help</span>
          <span className="text-xs">Reach out to us through any of these support channels</span>
        </div>
        <a href={basicDatas.telphone.slug} className=" text-sm lg:text-lg flex gap-1 hover:text-secondary "> <Image src="/icons/phone.svg" width={50} height={40}/>{basicDatas.telphone.label}</a>
        <a target="_blank" href={basicDatas.whatsapp.slug} className=" text-sm lg:text-lg flex gap-1 hover:text-secondary "><WhatsAppOutlined className=" text-xl" />{basicDatas.whatsapp.label}</a>
        <a href={basicDatas.email.slug} className="text-sm lg:text-xl hover:text-secondary"><MailOutlined /> {basicDatas.email.label}</a>
      </div>
    </div>
  )
}

export default AddressSection