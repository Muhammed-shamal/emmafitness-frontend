import Image from "next/image";

const iconData = [
  {
    icon: "0pers.svg",
    heading: "Flexible Payment",
    label: "Installment payments",
  },
  {
    icon: "delivery.svg",
    heading: "Fast Delivery & Installation",
    label: "Next-day delivery available",
  },
  {
    icon: "price.svg",
    heading: "Best Price Guarantee",
    label: "Seen it cheaper? We'll match it",
  },
  {
    icon: "aftersale.svg",
    heading: "After-Sale Support",
    label: "Dedicated technical team",
  },
];

function BottumHeader() {
  return (
    <div className="bg-secondary text-white p-3 shadow-sm">
      <div className="container mx-auto px-4 flex gap-4 overflow-x-auto md:overflow-visible whitespace-nowrap justify-between items-center text-xs md:text-sm">
        {iconData.map((item, idx) => (
          <FeaturePoints
            key={idx}
            heading={item.heading}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}

const FeaturePoints = ({ icon, heading, label }) => (
  <div className="flex items-center gap-2 min-w-max">
    <Image
      src={`/icons/${icon}`}
      alt={heading}
      width={30}
      height={30}
      className="w-5 h-5 md:w-7 md:h-7"
    />
    <div className="flex flex-col justify-center">
      <span className="font-semibold leading-none">{heading}</span>
      <span className="text-[10px] md:text-xs text-white/80 leading-tight">
        {label}
      </span>
    </div>
  </div>
);

export default BottumHeader;
