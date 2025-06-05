import { Divider, List, Space, Tag } from "antd"
import SocialIcon from "../SocialIcon"
import Link from "next/link"
import fetchApi from "../../../utility/api/fetchApi"
import { EnvironmentOutlined } from "@ant-design/icons"
import basicData from "../../../utility/basicDatas"

async function MainSection() {

const category = await fetchApi({URI: "categories?pagination[limit]=5&sort=createdAt:Desc"}).catch(err=>console.log(err))



    return (
        <div className="bg-slate-200 py-4 ">
            <div className="container flex flex-col md:flex-row justify-between gap-8">

                <div className="flex-1">
                    <Title title="ABOUT US" />
                    <p className="text-xs md:text-sm">We are passionate about the world of fitness and cutting-edge gym equipment. As dedicated fitness enthusiasts ourselves, we deeply understand the significance of a well-equipped workout space and the impact it can have on achieving your fitness goals.
      </p>
                </div>
                <div className="flex-1 ">
                    <Title title="CATEGORIES" />
                    <div className="flex flex-row gap-2 flex-wrap">

                        {
                            category?.data?.map(({attributes}, idx)=>(
                                
                                <Link key={idx} href={`/category/${attributes?.slug}`} className="bg-lightPrimary rounded p-2 text-sm border border-gray-300 ">{attributes?.Name}</Link>
                               ))
                        }
                         
                    </div>


                </div>
                <div className="flex flex-col gap-5">
                    <Title title="CONNECT WITH US" />
                    <SocialIcon width={22} height={16} />

                    <div className="flex flex-row gap-2 max-w-sm">
                        <EnvironmentOutlined className="text-xl"/>
                        <p className="text-sm">{basicData.location.label}</p>
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

