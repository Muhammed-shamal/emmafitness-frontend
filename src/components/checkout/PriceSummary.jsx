
function PriceSummary({total=0, subTotal=0, grandTotal=0, shipping=0, discount=0, taxAmount=0, taxName="" }) {
    return (
            <div className='flex flex-col gap-3'>
                <SummaryLabel Label="Total" Amount={total} />
                <SummaryLabel Label="Shipping" Amount={shipping} />
                <SummaryLabel Label="Discount" Amount={discount} />
                <SummaryLabel Label="Sub Total (Exc. VAT)" Amount={subTotal} />
                <SummaryLabel Label={`Tax ${taxName && "("+taxName+")"}`} Amount={taxAmount} />
                <div className='font-bold border-t border-y-gray-200 pt-4'>
                    <SummaryLabel Label="Grand Total" Amount={grandTotal} />
                </div>
            </div>
    )
}

export default PriceSummary



const SummaryLabel = ({ Label, Amount }) => (
    <div className='flex justify-between  text-sm'>
        <label>{Label}</label>
        <label>{Amount}</label>
    </div>
)