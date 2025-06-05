import { Card } from "antd"
import { userNavTab } from "../../utility/userTabNav"
import Link from "next/link"

export const metadata = {
  title: 'Emma Fitness | Your Premier Source for Quality Gym Equipment in Sharjah',
  description: 'Discover top-notch gym equipment at Emma Fitness in Sharjah. We specialize in trading high-quality fitness gear, providing a wide range of equipment to elevate your workout experience. Explore our selection and take a step closer to achieving your fitness goals with Emma Fitness today.',
}


function Page() {

  return (
    <div className="grid grid-cols-4 gap-4">
      {
        userNavTab?.map((tab, idx) => (
          <Link key={idx} href={tab.url}>

            <Card className="h-28 relative" >
              <h2 className="font-semibold">{tab.label}</h2>
              <div className="absolute bottom-1 right-1 text-gray-200 text-6xl">{tab.icon}</div>
            </Card>
          </Link>
        )
        )
      }
    </div>
  )
}

export default Page