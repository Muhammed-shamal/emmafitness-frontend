'use client'
import Marquee from 'react-fast-marquee'

export default function ServiceTicker() {
  const services = [
    "🚚 Free UAE Delivery on Orders Over 500 AED",
    "🛠 Spare Parts & Maintenance Services Available",
    "🔧 2 years Equipment Warranty",
    "🏋️‍♂️ Professional Assembly Available",
    "📞 24/7 Customer Support"
  ]

  return (
    <div className="bg-gray-900 text-gray-100 py-2">
      <Marquee speed={40} gradient={false}>
        {services.map((service, i) => (
          <span key={i} className="mx-8 flex items-center">
            {service}
          </span>
        ))}
      </Marquee>
    </div>
  )
}