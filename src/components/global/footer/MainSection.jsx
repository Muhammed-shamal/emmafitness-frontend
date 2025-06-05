import SocialIcon from "../SocialIcon"
import { EnvironmentOutlined } from "@ant-design/icons"
import basicData from "../../../utility/basicDatas"
import Image from "next/image"

function MainSection() {
    return (
        <div className="bg-slate-200 py-4 ">
            <div className="container flex flex-col md:flex-row justify-between gap-8">

                <div className="flex-1">
                    <Title title="ABOUT US" />
                    <p className="text-xs md:text-sm">
                        We are passionate about the world of fitness and cutting-edge gym equipment. As dedicated fitness enthusiasts ourselves, we deeply understand the significance of a well-equipped workout space and the impact it can have on achieving your fitness goals.
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    <Title title="CONNECT WITH US" />
                    <SocialIcon width={22} height={16} />

                    <div className="flex flex-row gap-2 max-w-sm">
                        <EnvironmentOutlined className="text-xl" />
                        <p className="text-sm">{basicData.location.label}</p>
                    </div>
                </div>

                {/* New Accepted Payment Methods Section */}
                <div className="flex flex-col">
                    <Title title="ACCEPTED PAYMENT METHODS" />
                    <div className="flex gap-2 items-center">
                        <Image src="/payment-icons/visa.svg" alt="Visa" className="h-6" width={100} height={70}/>
                        <Image src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-6" width={100} height={70}/>
                        <Image src="/payment-icons/paypal.svg" alt="Paypal" className="h-6" width={100} height={70}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MainSection

const Title = ({ title }) => (
    <h3 className="mb-3 h-5 font-semibold">{title}</h3>
)
