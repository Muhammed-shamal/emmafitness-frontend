
function PriceSummary({
    total = 0,
    subTotal = 0,
    grandTotal = 0,
    shipping = 0,
    discount = 0,
    taxAmount = 0,
    taxName = ""
}) {

    // Helper function to format numbers as AED currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100'>
            {/* Regular price items */}
            <div className='space-y-3'>
                <SummaryLabel label="Subtotal" amount={formatCurrency(total)} />
                <SummaryLabel label="Shipping" amount={formatCurrency(shipping)} />
                {discount > 0 && (
                    <SummaryLabel
                        label="Discount"
                        amount={`-${formatCurrency(discount)}`}
                        className="text-green-600"
                    />
                )}
                <SummaryLabel
                    label="Sub Total (Exc. VAT)"
                    amount={formatCurrency(subTotal)}
                />
                {taxAmount > 0 && (
                    <SummaryLabel
                        label={`Tax ${taxName && "(" + taxName + ")"}`}
                        amount={formatCurrency(taxAmount)}
                    />
                )}
            </div>

            {/* Grand Total - Emphasized */}
            <div className='border-t border-gray-200 pt-4'>
                <div className='flex flex-col items-end'>
                    <span className='font-semibold text-gray-800 text-base'>Grand Total</span>
                    <span className='font-bold text-gray-900 text-lg'>
                        {formatCurrency(grandTotal)}
                    </span>
                </div>
            </div>

        </div>
    );
}

export default PriceSummary;

const SummaryLabel = ({ label, amount, className = "" }) => (
    <div className='flex justify-between items-center text-sm'>
        <span className='text-gray-600'>{label}</span>
        <span className={`font-medium text-gray-800 ${className}`}>
            {amount}
        </span>
    </div>
);