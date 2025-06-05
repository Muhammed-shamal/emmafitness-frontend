import currency from "currency.js";

function Price({ salePrice = 0, regularPrice = 0 }) {
    var AED = value => currency(value, { symbol: "AED", separator: ",", decimal: "." });

    return (
        <div className='flex flex-row flex-wrap items-end '>
            < >
                <span className='font-bold text-lg -mb-1'>{currency(!salePrice ? regularPrice : salePrice).format({ symbol: "" })}</span>
                <span className='text-xs px-1'>AED</span>
            </>
            {
                (salePrice !== 0 && salePrice !== undefined) && 
                <span className="text-sm text-gray-400 line-through">{currency(regularPrice).format({ symbol: "" })}</span>
            }
                
        </div>
    )
}

export default Price

