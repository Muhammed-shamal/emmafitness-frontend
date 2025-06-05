import Image from "next/image"

const iconData = [
    {icon: "0pers.svg", heading:"Flexible Payment" , label:"Installment payments"},
    {icon: "delivery.svg", heading:"Fastest Delivery & Installation" , label:"Next Day Delivery Available"},
    {icon: "price.svg", heading:"Best Price Guarantee" , label:"Seen it cheaper? We'll match"},
    {icon: "aftersale.svg", heading:"After-Sale Support" , label:"With dedicate technical team"},
]

function BottumHeader() {

    return (
        <div className="bg-secondary shadow text-sm flex items-center">
            <div className="container flex gap-2 md:gap-3 lg:gap-4 xl:gap-8 text-white items-center">
               {
                iconData?.map((d,i)=>(

                    <FeaturePoints key={i} heading={d.heading} icon={d.icon} label={d.label}/>
                ))
               }
               
              

            </div>
        </div>
    )
}

const FeaturePoints = ({icon, heading, label})=>(
    <div className="md:flex flex-row items-center gap-1 md:gap-2 lg:gap-3 hidden">
    <Image src={`/icons/${icon}`} height={30} width={30}  alt="main icons" className="h-5"/>
    <div className="text-sm flex flex-col h-10 justify-center">
        <span className="-mb-1 mt-1 font-medium">{heading}</span>
        <span style={{fontSize : 9}} >{label}</span>
    </div>
</div>
)

export default BottumHeader