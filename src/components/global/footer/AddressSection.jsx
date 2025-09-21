import { MailOutlined, WhatsAppOutlined } from "@ant-design/icons"
import basicDatas from '../../../utility/basicDatas'
import Image from "next/image"

function AddressSection() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 md:py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          
          {/* Heading Section */}
          <div className="text-center md:text-left max-w-md">
            <h3 className="font-bold text-lg md:text-xl mb-1">We&apos;re Always Here To Help</h3>
            <p className="text-xs md:text-sm opacity-90">Reach out to us through any of these support channels</p>
          </div>
          
          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 flex-wrap">
            {/* Phone */}
            <a 
              href={basicDatas.telphone.slug} 
              className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            >
              <div className="bg-white/20 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <Image 
                  src="/icons/phone.svg" 
                  alt="Phone icon" 
                  width={20} 
                  height={20} 
                  className="filter brightness-0 invert"
                />
              </div>
              <span className="text-sm md:text-base font-medium">{basicDatas.telphone.label}</span>
            </a>
            
            {/* WhatsApp */}
            <a 
              target="_blank" 
              href={basicDatas.whatsapp.slug} 
              className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            >
              <div className="bg-white/20 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <WhatsAppOutlined className="text-lg" />
              </div>
              <span className="text-sm md:text-base font-medium">{basicDatas.whatsapp.label}</span>
            </a>
            
            {/* Email */}
            <a 
              href={basicDatas.email.slug} 
              className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            >
              <div className="bg-white/20 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <MailOutlined className="text-lg" />
              </div>
              <span className="text-sm md:text-base font-medium">{basicDatas.email.label}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressSection